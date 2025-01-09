import React, {useEffect, useState} from 'react';
import HomeNavigation from "../components/HomeNavigation";
import styles from '../styles/pages/Home.module.scss'
import Posts from "./Posts";
import {useNavigate} from "react-router-dom";
import {AUTH_URL} from "../config/host-config";
import {useDispatch} from "react-redux";
import {userActions} from "../components/store/user/UserSlice";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const checkLogin = async () => {
            const response = await fetch(`${AUTH_URL}/user`, {
                method: 'GET',
                credentials: 'include',
            })

            if (response.status === 200) {
                const userData = await response.json();
                dispatch(userActions.setUser(userData))
            }
        }
        checkLogin();
    }, []);

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