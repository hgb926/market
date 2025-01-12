import React, {useEffect} from 'react';
import styles from '../styles/layout/RootLayout.module.scss'
import {Outlet} from "react-router-dom";
import {AUTH_URL} from "../config/host-config";
import {userActions} from "../components/store/user/UserSlice";
import {useDispatch} from "react-redux";

const RootLayout = () => {

    const dispatch = useDispatch();
    const nickname = localStorage.getItem('nickname');

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
    useEffect(() => {
        if (nickname) checkLogin();
    }, []);


    return (
        <div className={styles.container}>
            <Outlet/>
        </div>
    );
};

export default RootLayout;