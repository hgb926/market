import React, {useEffect, useState} from 'react';
import styles from '../styles/layout/MainNavigation.module.scss'
import {HiMiniHome} from "react-icons/hi2";
import {RiMapPin2Fill} from "react-icons/ri";
import {BsChatDotsFill} from "react-icons/bs";
import {FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {AUTH_URL} from "../config/host-config";
import {useSelector} from "react-redux";

const MainNavigation = () => {

    const [currentPage, setCurrentPage] = useState('home')
    const navi = useNavigate();
    const userData = useSelector(state => state.userInfo.userData) || undefined;
    console.log(userData)

    // 자동 로그인 상태 확인


    return (
        <div className={styles.container}>
            <div className={styles.navWrap}>
                <Link to={'/'}
                    className={`${styles.menu} ${currentPage === 'home' ? styles.active : undefined}`}
                    onClick={() => setCurrentPage('home')}
                >
                    <HiMiniHome className={styles.icon}/>
                    <p>홈</p>
                </Link>
                <Link to={'chat'}
                    className={`${styles.menu} ${currentPage === 'chat' ? styles.active : undefined}`}
                    onClick={() => setCurrentPage('chat')}
                >
                    <BsChatDotsFill className={styles.icon}/>
                    <p>채팅</p>
                </Link>
                <Link to={'map'}
                    className={`${styles.menu} ${currentPage === 'map' ? styles.active : undefined}`}
                    onClick={() => setCurrentPage('map')}
                >
                    <RiMapPin2Fill className={styles.icon}/>
                    <p>동네지도</p>
                </Link>
                <Link to={`${userData ? 'info' : 'auth'}`}
                    className={`${styles.menu} ${currentPage === 'info' ? styles.active : undefined}`}
                    onClick={() => setCurrentPage('info')}
                >
                    <FaUser className={styles.icon}/>
                    <p>{`${userData ? '나의 정보' : '로그인'}`}</p>
                </Link>
            </div>
        </div>
    );
};

export default MainNavigation;