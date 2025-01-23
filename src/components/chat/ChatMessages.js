import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/pages/ChatRoom.module.scss';
import ShowUserImage from "../../ui/ShowUserImage";

const ChatMessages = ({ inputRef, messages, userId, chat }) => {
    const chatContainerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // 메시지가 변경될 때 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const triggerInputClick = () => {
        inputRef.current.focus();
    };

    return (
        <div className={styles.chatContainer} onClick={triggerInputClick} ref={chatContainerRef}>
            <div className={styles.systemNotice}>
                {chat.customerInfo.customerNickname}님께서 대화를 신청했습니다.
            </div>
            {messages.map((msg, idx) => {
                const isDifferentDate = idx === 0 || msg.formatTime[0] !== messages[idx - 1]?.formatTime[0];

                return msg.writer !== userId ? (
                    <React.Fragment key={msg.date}>
                        {isDifferentDate && <div className={styles.systemTime}>{msg.formatTime[0]}</div>}
                        <div className={styles.sellerChat}>
                            <div
                                className={`${styles.sellerImage} ${msg.imageUrl ? styles.alignSelf : ''}`}
                                style={{
                                    backgroundImage: `url(${userId === chat.customerInfo.customerId
                                        ? chat.sellerInfo.sellerImage
                                        : chat.customerInfo.customerImage})`,
                                }}
                            />
                            {msg.text ? (
                                <div className={styles.sellerText}>{msg.text}</div>
                            ) : (
                                <div
                                    className={styles.sellerImg}
                                    onClick={() => setSelectedImage(msg.imageUrl)}
                                    style={{ backgroundImage: `url(${msg.imageUrl})` }}
                                ></div>
                            )}
                            <div className={styles.sellerSendTime}>{msg.formatTime[1]}</div>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment key={msg.date}>
                        {isDifferentDate && <div className={styles.systemTime}>{msg.formatTime[0]}</div>}
                        <div className={styles.myChat}>
                            <div className={styles.myTime}>{msg.formatTime[1]}</div>
                            {msg.text ? (
                                <div className={styles.myText}>{msg.text}</div>
                            ) : (
                                <div
                                    className={styles.myImage}
                                    onClick={() => setSelectedImage(msg.imageUrl)}
                                    style={{ backgroundImage: `url(${msg.imageUrl})` }}
                                ></div>
                            )}
                        </div>
                    </React.Fragment>
                );
            })}

            {/* 이미지 모달 */}
            {selectedImage && (
                <ShowUserImage
                    image={selectedImage}
                    changeShowUserImage={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
};
export default ChatMessages;