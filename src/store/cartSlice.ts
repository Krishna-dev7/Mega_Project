import { createSlice, 
  PayloadAction } from "@reduxjs/toolkit";
import {ICart} from "@/models/cart.models";
import { IProduct } from "@/models/product.models";

type cartsType = {
  carts: Array<cartType>
}

export type cartType 
  = ICart & {product: IProduct}

const initialState:cartsType = {
  carts: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action:PayloadAction<cartsType>) => { 
      // console.log("carts received: 😄⚡", 
      //  action.payload)
       state.carts 
        = JSON.parse(JSON.stringify(action.payload));
    },
    
    setCart: (state, action:PayloadAction<cartType>) => { 
      // console.log("you called me: ", action.payload)
      const isExist = state.carts
        .some(cart => cart._id == action.payload._id)

      if(isExist) {
        state.carts = state.carts.map(cart => {
          if(cart._id == action.payload._id) {
            return {
              ...cart,
              quantity: cart.quantity+1
            }
          }
          return cart;
        })
      } else {
        state.carts
          .push(JSON.parse(JSON.stringify(action.payload)));
      }
    },

    incQuantity: (state, action) => {
      const newCarts = state.carts.map(cart => {
        if(cart._id == action.payload) {
          return { ...cart,
             quantity: ++cart.quantity};
        }
        return cart;
      })
      state.carts = newCarts;
    },

    delCart: (
        state, 
        action:PayloadAction<{id: string}>
      ) => {
        state.carts
          = state.carts.filter(
            cart => cart._id != action.payload.id)
    },

    decQuantity: (
      state, 
      action:PayloadAction<{id: string}>
    ) => {
        const newCarts = state.carts.map(cart => {
        if(cart._id == action.payload.id) {
          return { ...cart,
             quantity: --cart.quantity};
        }
        return cart;
      })
      state.carts = newCarts;
    },

    clearCarts: (state) => {
      state.carts = []
    }
  }
})


export const { 
  setCarts,
  setCart,
  delCart,
  decQuantity,
  incQuantity,
  clearCarts
 } = cartSlice.actions
export default cartSlice.reducer;