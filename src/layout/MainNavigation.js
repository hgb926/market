import React from 'react';
import styles from '../styles/layout/MainNavigation.module.scss';
import { HiMiniHome } from "react-icons/hi2";
import { RiMapPin2Fill } from "react-icons/ri";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MainNavigation = () => {
    const { pathname } = useLocation();
    const userData = useSelector(state => state.userInfo.userData) || "";


    return (
        <div className={styles.container}>
            <div className={styles.navWrap}>
                <Link
                    to={'/'}
                    className={`${styles.menu} ${pathname === '/' ? styles.active : ''}`}
                >
                    <HiMiniHome className={styles.icon} />
                    <p>홈</p>
                </Link>
                <Link
                    to={'/chat'}
                    className={`${styles.menu} ${pathname === '/chat' ? styles.active : ''}`}
                >
                    <BsChatDotsFill className={styles.icon} />
                    <p>채팅</p>
                </Link>
                <Link
                    to={'/map'}
                    className={`${styles.menu} ${pathname === '/map' ? styles.active : ''}`}
                >
                    <RiMapPin2Fill className={styles.icon} />
                    <p>동네지도</p>
                </Link>
                <Link
                    to={userData ? '/info' : '/auth'}
                    className={`${styles.menu} ${(pathname === '/info' || pathname === '/auth') ? styles.active : ''}`}
                >
                    <FaUser className={styles.icon} />
                    <p>{userData ? '나의 정보' : '로그인'}</p>
                </Link>
            </div>
        </div>
    );
};

export default MainNavigation;