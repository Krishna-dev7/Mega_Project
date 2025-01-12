import { currentAccount } from "@/services/AccountService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialType = {
  email: string,
  username: string,
  authStatus: boolean,
  data: currentAccount 
}

const initialState:initialType = {
  email: "",
  username: "",
  authStatus: false,
  data: {
    account: null
  }
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, 
      action:PayloadAction<initialType>) =>  {
        state.authStatus = action.payload.authStatus
        state.username = action.payload.username
        state.email = action.payload.email
        state.data = JSON.parse(JSON.stringify(action.payload.data))
    },

    unsetAuth: (state) => {
      state.authStatus = false,
      state.username = "",
      state.email = ""
      state.data = {
        account: null
      }
    }, 
  }
})


export const {
  setAuth,
  unsetAuth
} = authSlice.actions
export default authSlice.reducer;