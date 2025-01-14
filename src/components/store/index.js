import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./ui/UiSlice";
import userSlice from "./user/UserSlice";
import sseSlice from "./user/SseSlice";

const store = configureStore({
    reducer: {
        uiReducer:  uiSlice,
        userInfo:  userSlice,
        sse: sseSlice,
    }

})

export default store;