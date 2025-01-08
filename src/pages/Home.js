import React from 'react';
import HomeNavigation from "../components/HomeNavigation";
import styles from '../styles/pages/Home.module.scss'
import Posts from "./Posts";

const Home = () => {
    return (
        <div className={styles.container}>
            <HomeNavigation
                mainText={'백석동'}
                isRenderArrow={true}
                onlyBell={true}
            />
            <Posts/>
        </div>
    );
};

export default Home;