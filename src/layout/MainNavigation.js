import React from 'react';
import styles from '../styles/layout/MainNavigation.module.scss'
import {HiMiniHome} from "react-icons/hi2";
import {RiMapPin2Fill} from "react-icons/ri";
import {BsChatDotsFill} from "react-icons/bs";
import {FaUser} from "react-icons/fa";

const MainNavigation = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navWrap}>
                <div className={styles.menu}>
                    <HiMiniHome />
                    <p>홈</p>
                </div>
                <div className={styles.menu}>
                    <BsChatDotsFill />
                    <p>채팅</p>
                </div>
                <div className={styles.menu}>
                    <RiMapPin2Fill />
                    <p>동네지도</p>
                </div>
                <div className={styles.menu}>
                    <FaUser />
                    <p>나의 정보</p>
                </div>
            </div>
        </div>
    );
};

export default MainNavigation;