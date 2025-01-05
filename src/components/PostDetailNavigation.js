import React from 'react';
import styles from '../styles/components/PostDetailNavigation.module.scss'
import {IoIosArrowBack} from "react-icons/io";
import {HiMiniHome} from "react-icons/hi2";
import {MdIosShare} from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";
import {HiOutlineHome} from "react-icons/hi";

const PostDetailNavigation = () => {
    return (
        <div className={styles.navBar}>
            <div className={styles.flex}>
                <IoIosArrowBack />
                <HiOutlineHome />
            </div>
            <div className={styles.flex}>
                <MdIosShare />
                <BsThreeDotsVertical />
            </div>
        </div>
    );
};

export default PostDetailNavigation;