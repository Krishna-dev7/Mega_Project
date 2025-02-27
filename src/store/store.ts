import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./productSlice";
import { useDispatch, useSelector } from "react-redux";
import themeReducer from "./themeSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import pageReducer from "./paginationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    theme: themeReducer,
    pageination: pageReducer
  }
})

export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch;

// typed hooks
export const useAppDispatch = useDispatch.withTypes<appDispatch>()
export const useAppSelector = useSelector.withTypes<rootState>()
export default store;