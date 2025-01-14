import React from 'react';
import styles from '../styles/ui/Button.module.scss'
import {Link, useNavigate} from "react-router-dom";

const Button = ({text, url, userId}) => {

    const navi = useNavigate();

    const urlControlHandler = () => {

        if (!userId) {
            navi('/auth')
            return
        }
        navi(url)
    }
    return (
        <div
            onClick={urlControlHandler}
            className={styles.container}
        >
            + {text}
        </div>
    );
};

export default Button;