import { IProduct } from "@/models/product.models"
import { createSlice } from "@reduxjs/toolkit"

type stateType = {
  products: Array<IProduct>
}

const initialState: stateType = {
  products: []
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state) => {
      return state;
    }, 
    setProducts: (state, action) => {
      state.products = action.payload.products;
    }
  }
})


export const { getProducts, setProducts } = productSlice.actions
export default productSlice.reducer;
