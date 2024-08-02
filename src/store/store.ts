import { configureStore } from "@reduxjs/toolkit";
import { CART_PERSISTANT_STATE, USER_PERSISTENT_STATE, USERID_PERSISTENT_STATE } from "../constants/constants";
import { saveState } from "./localStorage/localStorage";
import userSlice from "./user.slice";
import cartSlice from "./cart.slice";

const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    },
})
store.subscribe(() => {
    saveState(USER_PERSISTENT_STATE, { token: store.getState().user.token })
    saveState(USERID_PERSISTENT_STATE, store.getState().user.user.id)
    saveState(CART_PERSISTANT_STATE, store.getState().cart.productsCart)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch