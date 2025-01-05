import React from 'react';
import TimeStatus from "../layout/TimeStatus";
import styles from '../styles/pages/MainPage.module.scss'
import MainSection from "../layout/MainSection";
import MainNavigation from "../layout/MainNavigation";

const MainPage = () => {
    return (
        <div>
            <TimeStatus/>
            <MainSection/>
            <MainNavigation/>
        </div>
    );
};

export default MainPage;