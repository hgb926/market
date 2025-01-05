import React from 'react';
import HomeNavigation from "../components/HomeNavigation";
import styles from '../styles/pages/Home.module.scss'

const Home = () => {
    return (
        <div className={styles.container}>
            <HomeNavigation/>
        </div>
    );
};

export default Home;