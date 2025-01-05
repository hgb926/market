import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./ui/UiSlice";

const store = configureStore({
    reducer: {
        uiReducer:  uiSlice,
    }

})

export default store;