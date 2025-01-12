import React, { useEffect, useRef } from 'react';
import styles from '../../styles/pages/ChatRoom.module.scss';

const ChatMessages = ({ messages, userId, chat }) => {
    const chatContainerRef = useRef(null);

    // 메시지가 변경될 때 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.chatContainer} ref={chatContainerRef}>
            {messages.map((msg) =>
                msg.writer !== userId ? (
                    <div className={styles.sellerChat} key={msg.date}>
                        <div
                            className={styles.sellerImage}
                            style={{
                                backgroundImage: `url(${userId !== chat.customerInfo.customerId
                                    ? chat.sellerInfo.sellerImage
                                    : chat.customerInfo.customerImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div className={styles.sellerText}>{msg.text}</div>
                        <div className={styles.sellerSendTime}>오후 3시</div>
                    </div>
                ) : (
                    <div className={styles.myChat} key={msg.date}>
                        <div className={styles.myTime}></div>
                        <div className={styles.myText}>{msg.text}</div>
                    </div>
                )
            )}
        </div>
    );
};

export default ChatMessages;