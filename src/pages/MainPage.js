import React from 'react';
import TimeStatus from "../layout/TimeStatus";
import styles from '../styles/pages/MainPage.module.scss'
import MainSection from "../layout/MainSection";
import MainNavigation from "../layout/MainNavigation";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {uiActions} from "../components/store/ui/UiSlice";


const MainPage = () => {

    let status = useSelector(state => state.uiReducer.renderMainNavi);
    const dispatch = useDispatch();
    let {pathname} = useLocation();
    const urls = [
        '/', '/chat', '/map', '/info'
    ]
    if (urls.some(u => u === pathname)) {
        dispatch(uiActions.changeRenderStatus(true))
    }

    return (
        <div className={styles.container}>
            <TimeStatus/>
            <MainSection/>
            { status && <MainNavigation/>}
        </div>
    );
};

export default MainPage;