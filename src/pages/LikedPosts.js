import React, {useEffect, useState} from 'react';
import MyPageHeader from "../components/auth/MyPageHeader";
import styles from '../styles/pages/Settings.module.scss'
import Spinner from "../skeleton/Spinner";
import {POST_URL} from "../config/host-config";
import {Link} from "react-router-dom";
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";

const LikedPosts = () => {

    const userId = localStorage.getItem('id');
    const [loading, setLoading] = useState(true)
    const [likedList, setLikedList] = useState([])

    const getLikedList = async () => {
        setLoading(true)
        let response = await fetch(`${POST_URL}/liked/${userId}`);
        if (response.status === 200) {
            let responseData = await response.json();
            setLikedList(responseData)
            console.log(responseData)
            setLoading(false)
        } else {
            let responseData = await response.json();
            console.log(responseData)
        }
    }

    useEffect(() => {
        getLikedList()
    }, []);


    if (loading) return <Spinner />

    return (
        <div className={styles.container}>
            <MyPageHeader title={'관심목록'}/>
            {likedList.reverse().map((post) => (
                <Link
                    to={`/post/${post._id}`}
                    key={post._id}
                    className={styles.post}
                    state={{post}} // props
                >
                    <img src={post.images[0]} alt={post.title} className={styles.image}/>
                    <div className={styles.details}>
                        <h3 className={styles.title}>{post.title}</h3>
                        <p className={styles.meta}>
                            {post.distance && <span>{post.distance}km · </span>}
                            {post.wantPlace} · {post.createdAt}
                        </p>
                        <div>
                            {post.tradeType === "SELL" &&
                                <span className={styles.price}>{post.price.toLocaleString('ko-KR')}원</span>}
                            <span
                                className={`${styles.tradeType} ${post.tradeType === "SELL" ? styles.tradeType : styles.share}`}>
                                {post.tradeType === "SELL" ? '' : "나눔"}
                            </span>
                        </div>
                    </div>
                    <div className={styles.icons}>
                        <span><IoChatbubbleEllipsesSharp/> {post.chats}</span>
                        <span><FaHeart/>️ {post.likes.length || 0}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default LikedPosts;