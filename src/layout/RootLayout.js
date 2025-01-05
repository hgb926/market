import React from 'react';
import styles from '../styles/layout/RootLayout.module.scss'
import {Outlet} from "react-router-dom";

const RootLayout = () => {
    return (
        <div className={styles.container}>
            <Outlet/>
        </div>
    );
};

export default RootLayout;