import React from 'react';
import styles from '../styles/components/HomeNavigation.module.scss'
import {IoIosArrowDown, IoMdSearch} from "react-icons/io";
import {RxHamburgerMenu} from "react-icons/rx";
import {LuBell} from "react-icons/lu";
import {AiFillSetting} from "react-icons/ai";
import {IoSettingsOutline} from "react-icons/io5";

const HomeNavigation = ({mainText, arrow, bell, hamburger, search, setting}) => {
    return (
        <div className={styles.container}>
            <div className={styles.town}>{mainText}
                {arrow && <IoIosArrowDown className={styles.arrow}/>}
            </div>
            <div className={styles.empty}></div>
            <div className={styles.menus}>
                { hamburger && <RxHamburgerMenu/>}
                { search && <IoMdSearch/>}
                { bell && <LuBell/>}
                { setting && <IoSettingsOutline />}
            </div>
        </div>
    );
};

export default HomeNavigation;