import React from 'react';
import styles from "./styles/pages/PostDetail.module.scss";
import {CHAT_URL} from "./config/host-config";
import {useSelector} from "react-redux";

const RequestChatBtn = ({ post }) => {

    const userData = useSelector(state => state.userInfo.userData) || "";

    console.log(userData)
    const requestChatHandler = async () => {
        console.log(userData.id);
        if (userData.id === post.writerId) return;
        const payload = {
            id: userData.id,
            writerId: post.writerId,
        };
        console.log(payload);
// 닉네임, 상품 정보,
        try {
            const response = await fetch(`${CHAT_URL}/request`, {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
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