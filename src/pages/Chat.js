import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Chat.module.scss'
import HomeNavigation from "../components/HomeNavigation";
import ChatSortBtn from "../components/ChatSortBtn";
import {CHAT_URL} from "../config/host-config";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const Chat = () => {

    const userId = localStorage.getItem('id')

    const [loading, setLoading] = useState(false)
    const [chatList, setChatList] = useState([])
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
                    {chatList.map((chat) => (
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
                                    <p className={styles.time}> · 3분 전</p>

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