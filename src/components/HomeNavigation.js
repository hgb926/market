import React, { useState, useEffect } from 'react';
import styles from '../styles/components/HomeNavigation.module.scss';
import { IoIosArrowDown, IoMdSearch } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { LuBell } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import HomeNavigationSkeleton from './HomeNavigationSkeleton';

const HomeNavigation = ({ mainText, arrow, bell, hamburger, search, setting }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 500ms 후 로딩 완료
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <HomeNavigationSkeleton />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.town}>
                {mainText}
                {arrow && <IoIosArrowDown className={styles.arrow} />}
            </div>
            <div className={styles.menus}>
                {hamburger && <RxHamburgerMenu />}
                {search && <IoMdSearch />}
                {bell && <LuBell />}
                {setting && <IoSettingsOutline />}
            </div>
        </div>
    );
};

export default HomeNavigation;