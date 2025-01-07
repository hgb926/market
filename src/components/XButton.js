import React from 'react';
import {useNavigate} from "react-router-dom";
import {MdOutlineCancel} from "react-icons/md";
import styles from '../styles/components/XButton.module.scss'

const XButton = ({changeShowImage, type}) => {

    const navi = useNavigate();
    const backHandler = () => {
        if (type === 'cancel') {
            changeShowImage(false)
        } else {
            navi('..')
        }
    }

    return (
        <div onClick={backHandler} className={styles.cancel}>
            x
            {/*<MdOutlineCancel*/}
            {/*style={{*/}
            {/*    width: '30px',*/}
            {/*    height: '30px'*/}
            {/*}}*/}
            {/*/>*/}
        </div>
    );
};

export default XButton;