import React, {useEffect, useState} from 'react';
import HomeNavigation from "../components/HomeNavigation";
import styles from '../styles/pages/Home.module.scss'
import Posts from "./Posts";
import {useNavigate} from "react-router-dom";
import {AUTH_URL} from "../config/host-config";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../components/store/user/UserSlice";
import {sliceAddress} from "../utils/sliceAddress";

const Home = () => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userInfo.userData);
    const address = userData?.address ? sliceAddress(userData.address) : null;

    // 자동로그인 체크
    const checkLogin = async () => {
        try {
            const response = await fetch(`${AUTH_URL}/user`, {
                method: 'GET',
                credentials: 'include', // 쿠키 포함
            });

            if (response.ok) {
                const userData = await response.json();
                dispatch(userActions.setUser(userData));
            } else {
                const { message } = await response.json();
                console.error('로그인 상태 확인 실패:', message);
                // 필요에 따라 사용자에게 알림
            }
        } catch (e) {
            console.error('서버 요청 중 오류 발생:', e);
            // 네트워크 오류 시 사용자에게 알림 추가
        }
    };
    // useEffect(() => {
    //     checkLogin();
    // }, []);

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