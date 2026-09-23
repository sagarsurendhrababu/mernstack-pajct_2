import { createSlice } from "@reduxjs/toolkit";

const initialState:{isAuth:boolean, user:{email:string,role:string}} = {
    isAuth:false,
    user:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess:(state,action) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        signoutAction:(state) => {
            state.isAuth = false;
            state.user = null;
        }
    }
});

export const {loginSuccess, signoutAction} =  authSlice.actions;
export default authSlice.reducer;