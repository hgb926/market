import React, {useEffect, useState} from 'react';
import styles from "../../styles/pages/PostDetail.module.scss";
import {FaHeart} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import RequestChatBtn from "../chat/RequestChatBtn";
import {POST_URL} from "../../config/host-config";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const PostBottomSection = ({post, isLike, setIsLike}) => {

    const userId = localStorage.getItem('id') || "";
    const userData = useSelector(state => state.userInfo.userData);
    const {id: postId} = useParams();
    console.log(isLike)


    const reactionHandler = async () => {

        const payload = {
            userId,
            postId,
            postImage: post.images[0],
            postTitle: post.title,
            writerId: post.writerId,
            senderNickname: userData.nickname
        }
        const response = await fetch(`${POST_URL}/reaction`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });
        if (response.status === 200) {
            let responseText = await response.text();
            responseText === "추가" ? setIsLike(true) : setIsLike(false)
        }
    }

    useEffect(() => {

    }, [isLike]);

    return (
        <div className={styles.bottomBar}>
            <div className={styles.bottomMain}>
                <div className={styles.heart}>
                    {isLike ?
                        <FaHeart
                            className={styles.liked}
                            onClick={reactionHandler}
                        />
                        :
                        <CiHeart
                            className={styles.unlike}
                            onClick={reactionHandler}
                        />
                    }
                </div>
                <div className={styles.descript}>
                    {post.tradeType === "SELL" ?
                        <>
                            <span className={styles.price}>{post.price.toLocaleString('ko-KR')}원</span>
                            <span className={styles.flag}>{post.suggestFlag ? '가격 제안 불가' : '가격 제한 가능'}</span>
                        </>
                        :
                        <span className={styles.price}>나눔!</span>}
                </div>

                {userId !== post.writerId &&
                    <RequestChatBtn
                        post={post}
                    />
                }
            </div>
        </div>
    );
};

export default PostBottomSection;