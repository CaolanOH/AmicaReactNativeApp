import  { createSlice } from "@reduxjs/toolkit"

export const chatHistorySlice = createSlice({
    name: "chatHistory",
    initialState: {value:[]},
    reducers:{
          addMessage: (state, action)=> {
            state.value.push(action.payload);
          }
    }
})

export const { addMessage } = chatHistorySlice.actions;


export default chatHistorySlice.reducer;