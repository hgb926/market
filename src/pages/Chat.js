import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Chat.module.scss'
import HomeNavigation from "../components/HomeNavigation";
import ChatSortBtn from "../components/ChatSortBtn";
import {CHAT_URL} from "../config/host-config";


const Chat = () => {

    const [chatList, setChatList] = useState([])
    const getChatList = async () => {
        const response = await fetch(`${CHAT_URL}/list`, {
            method: "GET",
            credentials: 'include'
        });
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
        </div>
    );
};

export default Chat;