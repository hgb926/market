import React, {useEffect, useState} from 'react';
import MyPageHeader from "../components/auth/MyPageHeader";
import styles from '../styles/pages/Settings.module.scss'
import Spinner from "../skeleton/Spinner";
import {POST_URL} from "../config/host-config";
import {Link} from "react-router-dom";
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";
import Post from "../components/post/Post";

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
                <Post post={post}/>
            ))}
        </div>
    );
};

export default LikedPosts;