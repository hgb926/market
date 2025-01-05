import React, {useState} from 'react';
import styles from '../styles/layout/MainNavigation.module.scss'
import {HiMiniHome} from "react-icons/hi2";
import {RiMapPin2Fill} from "react-icons/ri";
import {BsChatDotsFill} from "react-icons/bs";
import {FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";

const MainNavigation = () => {

    const [currentPage, setCurrentPage] = useState('home')


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
                <Link to={'info'}
                    className={`${styles.menu} ${currentPage === 'info' ? styles.active : undefined}`}
                    onClick={() => setCurrentPage('info')}
                >
                    <FaUser className={styles.icon}/>
                    <p>나의 정보</p>
                </Link>
            </div>
        </div>
    );
};

export default MainNavigation;