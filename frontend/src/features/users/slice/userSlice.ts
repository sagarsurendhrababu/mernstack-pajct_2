import { createSlice } from "@reduxjs/toolkit";

interface UserSliceType{
    users:{email:string,password:string}[],
    user:{_id:string,email:string,password:string} | null
}

const initialState:UserSliceType = {
    users:[],
    user:null,    
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        getAllUsers: (state,action) => {
            state.users = [...state.users, action.payload];    
        },
        createUser: (state,action) => {
            state.users = [...state.users, action.payload];
            state.user = action.payload;
        }
    }
})

export const {getAllUsers, createUser} = userSlice.actions;
export default userSlice.reducer;