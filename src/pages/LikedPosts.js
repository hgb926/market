import React, {useState} from 'react';
import MyPageHeader from "../components/auth/MyPageHeader";
import styles from '../styles/pages/Settings.module.scss';
import Spinner from "../skeleton/Spinner";

const LikedPosts = () => {

    const userId = localStorage.getItem('id');
    const [loading, setLoading] = useState(true)


    if (loading) return <Spinner />

    return (
        <div className={styles.container}>
            <MyPageHeader title={'관심목록'}/>
        </div>
    );
};

export default LikedPosts;