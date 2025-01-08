import React from 'react';
import styles from '../styles/components/HomeNavigation.module.scss'
import {IoIosArrowDown, IoMdSearch} from "react-icons/io";
import {RxHamburgerMenu} from "react-icons/rx";
import {LuBell} from "react-icons/lu";

const HomeNavigation = ({ mainText, isRenderArrow, onlyBell}) => {
    return (
        <div className={styles.container}>
            <div className={styles.town}>{mainText}
                { isRenderArrow && <IoIosArrowDown className={styles.arrow}/>}
            </div>
            <div className={styles.empty}></div>
            <div className={styles.menus}>
                { onlyBell &&
                    <>
                        <RxHamburgerMenu />
                        <IoMdSearch />
                    </>
                }
                <LuBell />
            </div>
        </div>
    );
};

export default HomeNavigation;