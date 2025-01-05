import React from 'react';
import styles from '../styles/layout/MainSection.module.scss'
import {Outlet} from "react-router-dom";

const MainSection = () => {
    return (
        <div className={styles.container}>
            <Outlet/>
        </div>
    );
};

export default MainSection;