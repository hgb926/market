import React from 'react';
import styles from "../../styles/pages/Settings.module.scss";
import {MdArrowBackIos} from "react-icons/md";
import {useNavigate} from "react-router-dom";

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
                <div className={styles.empty}></div>
            </div>
        </div>
    );
};

export default MyPageHeader;