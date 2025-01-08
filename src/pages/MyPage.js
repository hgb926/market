import React from 'react';
import styles from '../styles/pages/MyPage.module.scss'

const MyPage = () => {

    let userData = localStorage.getItem('userData');

    return (
        <div className={styles.container}>

        </div>
    );
};

export default MyPage;