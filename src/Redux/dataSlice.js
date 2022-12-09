
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trainingData: [],
    appData: [""]
}

const dataSlice = createSlice({
    name: "appData",
    initialState,
    reducers: {
    appData: (state, {payload}) => {
        state.appData = payload;
     },
    trainingData: (state, {payload}) => {
        state.trainingData = payload;
     },
   
    }
})


// Action creators are generated for each case reducer function
export const { appData , trainingData } = dataSlice.actions;

export default dataSlice.reducer;


