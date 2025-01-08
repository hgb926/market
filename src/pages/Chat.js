import React from 'react';
import styles from '../styles/pages/Chat.module.scss'
import HomeNavigation from "../components/HomeNavigation";

const Chat = () => {
    return (
        <div className={styles.container}>
            <HomeNavigation
                mainText={'채팅'}
                isRenderArrow={false}
                onlyBell={false}
            />
        </div>
    );
};

export default Chat;