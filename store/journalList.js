// Redux Toolkit Import
import  { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
// Creating chat history slice, setting initial state, and creating reducers
export const journallistSlice = createSlice({
    name: "journalList",
    initialState: {value:[]},
    reducers:{
          getJournalList: (state, action)=> {
            state.value = action.payload.journals;
          },
          addJournal: (state, action)=> {
            state.value.push(action.payload);
          }
    }
})
export const { addJournal, getJournalList } = journallistSlice.actions;
export default journallistSlice.reducer;