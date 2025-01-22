import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    notice: null,
    isNewNotice: false
}

const sseSlice = createSlice({
    name: "sse",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
            // console.log('redux가 관리하는 메세지\n',state.message)
        },
        setNotice: (state, action) => {
            state.notice = action.payload;
            state.isNewNotice = true;
            // console.log(`redux가 관라히는 알림\n${state.notice}`)
        },
        clearNewNotice: (state) => {
            state.isNewNotice = false;
        }
    }
})

export const sseActions = sseSlice.actions
export default sseSlice.reducer;