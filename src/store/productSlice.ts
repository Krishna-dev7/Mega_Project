import { IProduct } from "@/models/product.models"
import { createSlice } from "@reduxjs/toolkit"

type stateType = {
  products: Array<IProduct>,
  selectedProduct: IProduct | null
}

const initialState: stateType = {
  products: [],
  selectedProduct: null
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state) => {
      return state;
    }, 
    setProducts: (state, action) => {
      // console.log("productSlice: ", action.payload);
      state.products = action.payload;
    }, 
    selectProduct: (state, action) => {
      const newProducts = state.products?.filter(product => (
        product._id == action.payload
      ))

      state.selectedProduct = newProducts[0];
      return state;
    }
  }
})


export const { getProducts, setProducts, selectProduct } = productSlice.actions
export default productSlice.reducer;
