import React from 'react';
import styles from '../styles/pages/MyPage.module.scss'
import HomeNavigation from "../components/HomeNavigation";
import {AUTH_URL} from "../config/host-config";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const MyPage = () => {

    const navi = useNavigate();
    let userData = useSelector(state => state.userInfo.userData);


    // 테스트코드 (정상작동, credentials를 보내면 서버에서 req.user가 가능
    const logoutHandler = async () => {
        await fetch(`${AUTH_URL}/logout`, {
            method: 'GET',
            credentials: 'include'
        })

        navi('/auth')
    }

    return (

        <div className={styles.container}>
            <HomeNavigation
                mainText={'나의 Market'}
                setting={true}
            />
            <div
                style={{marginTop: '300px'}}
                onClick={logoutHandler}
            >logout
            </div>
            <div>{userData.nickname}</div>
            <img src={userData.profileUrl} style={
                {
                    objectFit: 'cover',
                    width: '300px',
                    height: '300px'
                }
            }/>
        </div>
    );
};

export default MyPage;