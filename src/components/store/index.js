import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./ui/UiSlice";
import userSlice from "./user/UserSlice";

const store = configureStore({
    reducer: {
        uiReducer:  uiSlice,
        userInfo:  userSlice,
    }

})

export default store;