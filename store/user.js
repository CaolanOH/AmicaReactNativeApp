// Redux Toolkit Import
import  { createSlice } from "@reduxjs/toolkit"
// Creating user slice, setting initial state, and creating reducers
export const userSlice = createSlice({
    name: "user",
    initialState: { value: {name:"", email:"", access_token: "", auth:false} },
    reducers:{
        login: (state, action) =>{
            state.value = action.payload;
        },
        logout: (state, action) =>{
            state.value.auth = action.payload;
        }
    },
});
export const { login,logout } = userSlice.actions; 
export default userSlice.reducer;