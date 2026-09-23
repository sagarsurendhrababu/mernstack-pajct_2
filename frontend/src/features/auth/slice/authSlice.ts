import { createSlice } from "@reduxjs/toolkit";

const initialState:{isAuth:boolean, user:{email:string,role:string} | null, isLoading:boolean} = {
    isAuth:false,
    user:null,
    isLoading:true
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess:(state,action) => {
            state.isAuth = true;
            state.user = action.payload;
            state.isLoading = false;
        },
        signoutAction:(state) => {
            state.isAuth = false;
            state.user = null;
            state.isLoading =  false;
        }
    }
});

export const {loginSuccess, signoutAction} =  authSlice.actions;
export default authSlice.reducer;