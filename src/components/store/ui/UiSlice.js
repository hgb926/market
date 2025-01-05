import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    renderMainNavi: true
}

const uiSlice = createSlice({
    name: "uiReducer",
    initialState,
    reducers: {
        changeRenderStatus(state, action) {
            state.renderMainNavi = action.payload
            console.log(state.renderMainNavi)
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;