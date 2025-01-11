import React, {useState} from 'react';
import styles from "./styles/pages/PostDetail.module.scss";
import {CHAT_URL} from "./config/host-config";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const RequestChatBtn = ({post}) => {

    const userData = useSelector(state => state.userInfo.userData) || "";
    const navi = useNavigate();

    console.log(userData)
    console.log(post)
    const requestChatHandler = async () => {
        console.log(userData.id);
        if (userData.id === post.writerId) return;
        const payload = {
            customerInfo: {
                customerId: userData.id,
                customerNickname: userData.nickname,
                customerImage: userData.profileUrl,
            },
            sellerInfo: {
                sellerId: post.writerId,
                sellerNickname: post.writerInfo.nickname,
                sellerImage: post.writerInfo.profileUrl,
            },
            postInfo: {
                postId: post._id,
                postTitle: post.title,
                postImage: post.images[0],
                postPrice: post.price,
                postSuggestFlag: post.suggestFlag
            },
        };
        try {
            const response = await fetch(`${CHAT_URL}/request`, {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                let msg = await response.json();
                navi(`/chat/${msg.chatId}`)
            } else {
                throw new Error(`HTTP error! status: ${response.status}, userData.id : ${userData.id}`);
            }
        } catch (error) {
            console.error("Fetch error:", error); // 에러 로그 출력
        }
    };

    return (
        <div
            className={styles.chat}
            onClick={requestChatHandler}
        >
            채팅하기
        </div>
    );
};

export default RequestChatBtn;