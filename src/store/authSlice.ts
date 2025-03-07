// import { currentAccount } from "@/services/AccountService";
import { IProfile } from "@/models/profile.models";
import { UserSchema } from "@/models/user.models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type initialType = {
  email: string,
  username: string,
  authStatus: boolean,
  data: ( IProfile & {
    owner: UserSchema
  }) | null
}

const initialState:initialType = {
  email: "",
  username: "",
  authStatus: false,
  data: null
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
      state.data = null
    }, 
  }
})


export const {
  setAuth,
  unsetAuth
} = authSlice.actions
export default authSlice.reducer;