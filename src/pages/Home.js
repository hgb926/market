import React from 'react';
import HomeNavigation from "../components/HomeNavigation";
import styles from '../styles/pages/Home.module.scss'
import Posts from "./Posts";

const Home = () => {
    return (
        <div className={styles.container}>
            <HomeNavigation
                mainText={'백석동'}
                arrow={true}
                hamburger={true}
                search={true}
                bell={true}
            />
            <Posts/>
        </div>
    );
};

export default Home;