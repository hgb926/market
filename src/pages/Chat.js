import React from 'react';
import styles from '../styles/pages/Chat.module.scss'
import HomeNavigation from "../components/HomeNavigation";
import ChatSortBtn from "../components/ChatSortBtn";

const Chat = () => {
    return (
        <div className={styles.container}>
            <HomeNavigation
                mainText={'채팅'}
                isRenderArrow={false}
                onlyBell={false}
            />
            <ChatSortBtn/>
        </div>
    );
};

export default Chat;