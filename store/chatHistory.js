// Redux Toolkit Import
import  { createSlice } from "@reduxjs/toolkit"
// Creating chat history slice, setting initial state, and creating reducers
export const chatHistorySlice = createSlice({
    name: "chatHistory",
    initialState: {value:[]},
    reducers:{
      getMessages: (state, action)=> {
        state.value.push(action.payload);
      },
          addMessage: (state, action)=> {
            state.value.push(action.payload);
          }
    }
})
export const { addMessage } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;