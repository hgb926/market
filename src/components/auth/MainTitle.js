import React from 'react';
import styles from '../../styles/pages/Register.module.scss'

const MainTitle = ({title, subText}) => {
    return (
        <h1 className={styles.title}>
            {title} <br/>
            { subText && subText}
        </h1>
    );
};

export default MainTitle;