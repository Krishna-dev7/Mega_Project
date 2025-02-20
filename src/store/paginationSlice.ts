import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageIndex: 0,
}


const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    }
  }
})

export const {setPageIndex} = paginationSlice.actions;
export default paginationSlice.reducer;