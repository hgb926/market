import React from 'react';
import styles from '../styles/components/PostDetailNavigation.module.scss'
import {IoIosArrowBack} from "react-icons/io";
import {MdIosShare} from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";
import {HiOutlineHome} from "react-icons/hi";
import {useNavigate} from "react-router-dom";


const PostDetailNavigation = () => {

    const navi = useNavigate();
    const homeHandler = () => {
        navi('..')
    }

    return (
        <div className={styles.navBar}>
            <div className={styles.flex}>
                <IoIosArrowBack onClick={homeHandler}/>
                <HiOutlineHome onClick={homeHandler}/>
            </div>
            <div className={styles.flex}>
                <MdIosShare />
                <BsThreeDotsVertical />
            </div>
        </div>
    );
};

export default PostDetailNavigation;