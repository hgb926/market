import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
}

const sseSlice = createSlice({
    name: "sse",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
            console.log('redux가 관리하는 메세지\n',state.message)
        }
    }
})

export const sseActions = sseSlice.actions
export default sseSlice.reducer;