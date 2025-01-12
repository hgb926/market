import React from 'react';
import styles from '../../styles/pages/ChatRoom.module.scss';

const ChatMessages = ({ messages, userId, chat }) => (
    <div className={styles.chatContainer}>
        {messages.map((msg) => (
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
                </div>
            ) : (
                <div className={styles.myChat} key={msg.date}>
                    <div className={styles.myText}>{msg.text}</div>
                </div>
            )
        ))}
    </div>
);

export default ChatMessages;