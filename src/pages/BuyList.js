import React, {useEffect, useState} from 'react';
import MyPageHeader from "../components/auth/MyPageHeader";
import styles from '../styles/pages/Settings.module.scss'
import Spinner from "../skeleton/Spinner";
import {POST_URL} from "../config/host-config";
import Post from "../components/post/Post";

const BuyList = () => {

    const userId = localStorage.getItem('id');
    const [loading, setLoading] = useState(true)
    const [buyList, setBuyList] = useState([])

    useEffect(() => {
        (async () => {
            setLoading(true)
            let response = await fetch(`${POST_URL}/buy/${userId}`);
            if (response.status === 200) {
                let responseData = await response.json();
                setBuyList(responseData)
                setLoading(false)
            } else {
                let responseData = await response.json();
                console.log(responseData)
            }
        })()
    }, []);


    if (loading) return <Spinner />

    return (
        <div className={styles.container}>
            <MyPageHeader title={'구매 내역'}/>
            {buyList.map((post) => (
                <Post post={post}/>
            ))}
        </div>
    );
};

export default BuyList;