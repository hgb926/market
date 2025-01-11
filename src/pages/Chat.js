import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Chat.module.scss'
import HomeNavigation from "../components/HomeNavigation";
import ChatSortBtn from "../components/ChatSortBtn";
import {CHAT_URL} from "../config/host-config";
import {useSelector} from "react-redux";


const Chat = () => {

    let userData = useSelector(state => state.userInfo.userData);
    const [chatList, setChatList] = useState([])
    const getChatList = async () => {
        const response = await fetch(`${CHAT_URL}/list`, {
            method: "GET",
            credentials: 'include'
        });
        if (response.status === 200) {
            let result = await response.json();
            console.log(result)
            setChatList(result)
        }
    }
    useEffect(() => {
        getChatList()
    }, []);

    return (
        <div className={styles.container}>
            <HomeNavigation
                mainText={'채팅'}
                bell={true}
            />
            <ChatSortBtn/>
            <div className={styles.chatContainer}>
                {chatList.map((chat) => (
                    <div className={styles.chat} key={chat._id} >
                        <div
                            className={styles.sellerImage}
                            style={{
                                backgroundImage: `url(${userData.id === chat.customerInfo.customerId ?
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
                                    {userData.id === chat.customerInfo.customerId ?
                                    chat.sellerInfo.sellerNickname :
                                    chat.customerInfo.customerNickname}</p>
                                {/*<p>{chat.lastChatTime}</p>*/}
                                <p className={styles.time}> · 3분 전</p>

                            </div>
                            <div className={styles.lastChat}>
                                {chat.lastMsg || "아직 대화가 없습니다."}
                            </div>
                        </div>
                    </div>))}
            </div>
        </div>
    )
        ;
};

export default Chat;