import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null, // 초기 상태
};

const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload; // 유저 데이터 저장
        },
        clearUser: (state) => {
            state.useData = null; // 유저 데이터 초기화
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;