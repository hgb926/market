import React from 'react';
import styles from '../styles/ui/Button.module.scss'
import {LuPlus} from "react-icons/lu";

const Button = ({type, text}) => {
    return (
        <div className={styles.container}>
            + {text}
        </div>
    );
};

export default Button;