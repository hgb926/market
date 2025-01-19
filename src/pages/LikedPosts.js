import React from 'react';
import MyPageHeader from "../components/auth/MyPageHeader";
import styles from '../styles/pages/Settings.module.scss';

const LikedPosts = () => {
    return (
        <div className={styles.container}>
            <MyPageHeader title={'관심목록'}/>
        </div>
    );
};

export default LikedPosts;