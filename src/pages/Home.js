import React from 'react';
import HomeNavigation from "../components/HomeNavigation";
import styles from '../styles/pages/Home.module.scss'
import Posts from "./Posts";

const Home = () => {
    return (
        <div className={styles.container}>
            <HomeNavigation/>
            <Posts/>
        </div>
    );
};

export default Home;