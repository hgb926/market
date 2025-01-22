import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/pages/ChatRoom.module.scss';
import ShowUserImage from "../../ui/ShowUserImage";

const ChatMessages = ({inputRef, messages, userId, chat}) => {
    const chatContainerRef = useRef(null);
    const [showImage, setShowImage] = useState(false)
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
            <div className={styles.systemNotice}>{chat.customerInfo.customerNickname}님께서 대화를 신청했습니다.</div>
            {messages.map((msg, idx) => {
                const isDifferentDate = idx === 0 || msg.formatTime[0] !== messages[idx - 1]?.formatTime[0];
                // const isDifferentTime = idx === 0 || msg.formatTime[1] !== messages[idx - 1]?.formatTime[1];

                return msg.writer !== userId ? (
                    <>
                        {isDifferentDate && <div className={styles.systemTime}>{msg.formatTime[0]}</div>}
                        <div className={styles.sellerChat} key={msg.date}>
                            <div
                                className={`${styles.sellerImage} ${msg.imageUrl ? styles.alignSelf : ''}`}
                                style={{
                                    backgroundImage: `url(${userId === chat.customerInfo.customerId
                                        ? chat.sellerInfo.sellerImage
                                        : chat.customerInfo.customerImage})`,
                                }}
                            />
                            {msg.text ?
                                <div className={styles.sellerText}>{msg.text}</div>
                                :
                                <div className={styles.sellerImg}
                                     onClick={() => setShowImage(true)}
                                     style={{backgroundImage: `url(${msg.imageUrl})`}}
                                ></div>
                            }
                            <div className={styles.sellerSendTime}>
                                {msg.formatTime[1]}</div>
                        </div>
                        {showImage && (<ShowUserImage
                            changeShowUserImage={setShowImage}
                            image={msg.imageUrl}
                        />)}
                    </>
                ) : (
                    <>
                        {isDifferentDate && <div className={styles.systemTime}>{msg.formatTime[0]}</div>}
                        <div className={styles.myChat} key={msg.date}>

                            <div className={styles.myTime}>
                                {msg.formatTime[1]}
                            </div>
                            {msg.text ?
                                <div className={styles.myText}>{msg.text}</div> :
                                <div className={styles.myImage}
                                     onClick={() => setShowImage(true)}
                                     style={{backgroundImage: `url(${msg.imageUrl})`}}></div>
                            }
                        </div>
                        {showImage && (<ShowUserImage
                            image={msg.imageUrl}
                            changeShowUserImage={setShowImage}
                        />)}
                    </>
                );
            })}
        </div>
    );
};

export default ChatMessages;