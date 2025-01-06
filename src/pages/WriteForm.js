import React from 'react';
import styles from '../styles/pages/WriteForm.module.scss'
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";

const WriteForm = () => {

    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))


    return (
        <div>
            write form
        </div>
    );
};

export default WriteForm;