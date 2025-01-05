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
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;