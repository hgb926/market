import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Chat.module.scss'
import HomeNavigation from "../components/HomeNavigation";
import ChatSortBtn from "../components/ChatSortBtn";
import {CHAT_URL} from "../config/host-config";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";



const Chat = () => {

    const userId = localStorage.getItem('id')
    const newMessage = useSelector(state => state.sse.message);
    const [loading, setLoading] = useState(false)
    const [chatList, setChatList] = useState([])


    useEffect(() => {
        if (!userId) return;

        console.log(`room sse 요청 시작, ${userId}`);
        const eventSource = new EventSource(`${CHAT_URL}/sse/room?userId=${userId}`);

        eventSource.onmessage = (event) => {
            const newRoomData = JSON.parse(event.data);
            setChatList((prev) => [...prev, newRoomData]);
        };

        eventSource.onerror = () => {
            console.log('연결 끊김, 재연결 시도 중...');
        };

        return () => {
            eventSource.close();
        };
    }, [userId]); // `chatList`와 `newMessage`를 제외

    useEffect(() => {
        if (!newMessage) return;
        console.log("새 메시지:", newMessage);
        setChatList((prev) =>
            prev.map((chat) =>
                chat._id === newMessage.room // roomId가 일치하는지 확인
                    ? { ...chat, lastMsg: newMessage.text, lastChatTime: newMessage.date } // 갱신
                    : chat // 그대로 유지
            )
        );
    }, [newMessage]); // `newMessage`가 변경될 때만 실행



    const getChatList = async () => {
        setLoading(true)
        const response = await fetch(`${CHAT_URL}/list`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: userId})
        });
        if (response.status === 200) {
            let result = await response.json();
            setChatList(result)
            setLoading(false)
        } else {
            setLoading(true)
        }
    }
    useEffect(() => {
        getChatList()
    }, []);



    return (
        <>
            {!loading && (<div className={styles.container}>
                <HomeNavigation
                    mainText={'채팅'}
                    bell={true}
                />
                <ChatSortBtn/>
                <div className={styles.chatContainer}>
                    {chatList.slice().reverse().map((chat) => (
                        <Link
                            className={styles.chat}
                            key={chat._id}
                            to={`/chat/${chat._id}`}
                        >
                            <div
                                className={styles.sellerImage}
                                style={{
                                    backgroundImage: `url(${userId === chat.customerInfo.customerId ?
                                        chat.sellerInfo.sellerImage :
                                        chat.customerInfo.customerImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div
                                    className={styles.postImage}
                                    style={{
                                        backgroundImage: `url(${chat.postInfo.postImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                            </div>
                            <div className={styles.metaData}>
                                <div className={styles.partnerInfo}>
                                    <p className={styles.partnerNickname}>
                                        {userId === chat.customerInfo.customerId ?
                                            chat.sellerInfo.sellerNickname :
                                            chat.customerInfo.customerNickname}</p>
                                    {/*<p>{chat.lastChatTime}</p>*/}
                                    <p className={styles.time}> · {chat.relativeTime || "방금 전"}</p>

                                </div>
                                <div className={styles.lastChat}>
                                    {chat.lastMsg || `${chat.customerInfo.customerNickname}님께서 대화를 신청했습니다.`}
                                </div>
                            </div>
                        </Link>))}
                </div>
            </div>)}
        </>)
        ;
};

export default Chat;