import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { ICart, IDelivery, IOrder, IProductData } from "../interfaces/interfaces";
import { getState } from "./localStorage/localStorage";
import { CART_PERSISTANT_STATE, PREFIX } from "../constants/constants";
import { RootState } from "./store";

export interface ICartItem {
    id: number,
    count: number
}

export interface IInitialState {
    productsCart: ICartItem[],
    products: IProductData[],
    delivery: ICart[]
    error: null | string
}

const initialState: IInitialState = {
    productsCart: getState(CART_PERSISTANT_STATE) ?? [],
    products: [],
    delivery: [],
    error: null
}

export const getProductById = createAsyncThunk<IProductData[], ICartItem[], { rejectValue: string }>(
    'cart/getProductById',
    async (cartItems, { rejectWithValue }) => {

        const data: IProductData[] = await Promise.all(cartItems.map(async (i) => {
            if (i.count > 0) {
                const res = await fetch(`${PREFIX}/menu/${i.id}`, {
                    method: 'GET',
                })
                if (!res.ok) {
                    rejectWithValue(await res.json())
                }
                return await res.json()
            }

        }))

        return data
    }
)

export const postOrder = createAsyncThunk<IOrder, IOrder, { rejectValue: string, state: RootState }>(
    'cart/postOrder',
    async (order, { rejectWithValue, getState }) => {
        const res = await fetch(`${PREFIX}/cart`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getState().user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                order
            )
        })

        if (!res.ok) {
            rejectWithValue(await res.json())
        }

        const data = await res.json() as IOrder;
        return data
    }
)

export const getCart = createAsyncThunk<IDelivery[], void, { rejectValue: string, state: RootState }>(
    'cart/getCart',
    async (_, { rejectWithValue, getState }) => {
        const res = await fetch(`http://localhost:3001/users/?_embed=cart`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getState().user.token}`,
            }
        })

        if (!res.ok) {
            rejectWithValue(await res.json())
        }

        const data = await res.json() as IDelivery[];
        return data
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action: PayloadAction<number>) {
            const exist = state.productsCart.find((i) => {
                if (i.id === action.payload) {
                    return i
                }
            })

            if (exist) {
                exist.count += 1
                state.productsCart.forEach((i) => {
                    if (i.id === exist.id) {
                        i = exist
                    }
                })
            } else {
                state.productsCart.push({ id: action.payload, count: 1 })
            }
        },
        inc(state, action: PayloadAction<number>) {
            state.productsCart.forEach((i) => {
                if (i.id === action.payload) {
                    i.count += 1
                }
            })
        },
        dec(state, action: PayloadAction<number>) {
            state.productsCart.forEach((i) => {
                if (i.id === action.payload) {
                    if (i.count === 1) {
                        state.productsCart = state.productsCart.filter((el) => {
                            return el.id != i.id
                        })
                    } else {
                        i.count -= 1
                    }
                }
            })
        },
        remove(state, action: PayloadAction<number>) {
            state.productsCart = state.productsCart.filter((i) => {
                return i.id !== action.payload
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductById.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(postOrder.fulfilled, (state) => {
                state.productsCart = []
                state.products = []
            })
            .addCase(getCart.fulfilled, (state, action) => {
                action.payload.forEach((i) => {
                    if (!i.cart.length) {
                        return;
                    } else {
                        state.delivery = i.cart
                    }
                })
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.type
            })

    }
})

export const { add, inc, dec, remove } = cartSlice.actions
export default cartSlice.reducer

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected')
}