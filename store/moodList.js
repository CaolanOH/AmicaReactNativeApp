// Redux Toolkit Import
import  { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
// Creating chat history slice, setting initial state, and creating reducers
export const moodlistSlice = createSlice({
    name: "moodList",
    initialState: {value:[]},
    reducers:{

          getMoodList: (state, action)=> {
            state.value = action.payload.moods;
          },

          addMood: (state, action)=> {
            state.value.push(action.payload);
          }
    }
})
export const { addMood, getMoodList } = moodlistSlice.actions;
export default moodlistSlice.reducer;