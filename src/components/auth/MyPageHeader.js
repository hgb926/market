import React from 'react';
import styles from "../../styles/pages/Settings.module.scss";
import {MdArrowBackIos} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {IoMdSearch} from "react-icons/io";

const MyPageHeader = ({ title }) => {

    const navi = useNavigate();

    return (
        <div className={styles.top}>
            <div className={styles.subContainer}>
                <MdArrowBackIos
                    className={styles.back}
                    onClick={() => navi(-1)}
                />
                <h1 className={styles.title}>{title}</h1>
                <IoMdSearch className={styles.search} onClick={() => navi('/search')}/>
            </div>
        </div>
    );
};

export default MyPageHeader;