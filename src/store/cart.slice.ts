import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IProductData } from "../interfaces/interfaces";
import { getState } from "./localStorage/localStorage";
import { CART_PERSISTANT_STATE } from "../constants/constants";

export interface ICartItem {
    id: number,
    count: number
}

export interface IInitialState {
    productsCart: ICartItem[],
    products: IProductData[]
}

const initialState: IInitialState = {
    productsCart: getState(CART_PERSISTANT_STATE) ?? [],
    products: []
}

export const getProductById = createAsyncThunk<IProductData[], ICartItem[], { rejectValue: string }>(
    'cart/getProductById',
    async (cartItems, { rejectWithValue }) => {

        const data: IProductData[] = await Promise.all(cartItems.map(async (i) => {
            if (i.count != 0) {
                const res = await fetch(`http://localhost:3001/menu/${i.id}`, {
                    method: 'GET',
                })
                if (!res.ok) {
                    rejectWithValue(res.statusText)
                }
                return await res.json()
            }

        }))

        return data
    }
)

export const postOrder = createAsyncThunk<IOrder, IOrder, { rejectValue: string }>(
    'cart/postOrder',
    async (order, { rejectWithValue }) => {
        const res = await fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                order
            )
        })

        if (!res.ok) {
            rejectWithValue(res.statusText)
        }

        const data = await res.json() as IOrder;
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
            })

    }
})

export const { add, inc, dec, remove } = cartSlice.actions
export default cartSlice.reducer