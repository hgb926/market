import React, {useEffect, useState} from 'react';
import HomeNavigation from "../components/navigations/HomeNavigation";
import styles from '../styles/pages/Home.module.scss'
import Posts from "./Posts";
import {useSelector} from "react-redux";
import {sliceAddress} from "../utils/sliceAddress";

const Home = () => {


    const userData = useSelector(state => state.userInfo.userData);
    const address = userData?.address ? sliceAddress(userData.address) : null;

    return (
        <div className={styles.container}>
            <HomeNavigation
                mainText={address ? address : " "}
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