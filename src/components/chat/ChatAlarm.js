import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/ChatAlarm.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ChatAlarm = ({ message, setShowAlarm }) => {
    const userData = useSelector((state) => state.userInfo.userData);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // 5초 후 사라지기 시작
        const timeout = setTimeout(() => {
            setIsFadingOut(true);
        }, 5000);

        // fadeOut 애니메이션 종료 후 컴포넌트 숨기기
        const fadeOutTimeout = setTimeout(() => {
            setShowAlarm(false);
        }, 5500); // fadeOut 애니메이션 시간(0.5초) 포함

        return () => {
            clearTimeout(timeout);
            clearTimeout(fadeOutTimeout);
        };
    }, [setShowAlarm]);

    return (
        <Link
            className={`${styles.container} ${isFadingOut ? styles.fadeOut : ''}`}
            to={`/chat/${message.room}`}
        >
            <div className={styles.msgWrap}>
                <div
                    className={styles.image}
                    style={{
                        backgroundImage: `url(${message.profileUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                    }}
                ></div>
                <div className={styles.wrap}>
                    <p className={styles.name}>{message.nickname}</p>
                    <p className={styles.text}>{message.text || `${message.nickname}님께서 사진을 보냈습니다.`}</p>
                </div>
                <div className={styles.postTitle}>{message.postTitle.length > 9 ? message.postTitle.slice(0, 10) + "..." : message.postTitle}</div>
            </div>
        </Link>
    );
};

export default ChatAlarm;