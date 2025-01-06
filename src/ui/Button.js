import React from 'react';
import styles from '../styles/ui/Button.module.scss'
import {Link} from "react-router-dom";

const Button = ({text, url}) => {
    return (
        <Link
            to={url}
            className={styles.container}
        >
            + {text}
        </Link>
    );
};

export default Button;