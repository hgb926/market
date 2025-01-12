import React, {useState} from 'react';
import styles from "../../styles/pages/PostDetail.module.scss";
import {CHAT_URL} from "../../config/host-config";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const RequestChatBtn = ({post}) => {

    const userData = useSelector(state => state.userInfo.userData) || "";
    const navi = useNavigate();

    // 1. 유저가 채팅하기 누르면 채팅방 하나 생성
    // 2. 그 채팅방으로 이동까지

    const requestChatHandler = async () => {

        if (userData._id === post.writerId) return;
        const payload = {
            customerInfo: {
                customerId: userData._id,
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
                postSuggestFlag: post.suggestFlag,
                tradeType: post.tradeType
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
                console.log(msg)
                navi(`/chat/${msg.chatId}`)
            } else {
                throw new Error(`HTTP error! status: ${response.status}, userData.id : ${userData._id}`);
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