import React from 'react';
import styles from '../../styles/components/ChatMenuDropUp.module.scss'


const ChatMenuDropDown = ({ setMenuDrop }) => {
    return (
        <div className={styles.container}>
            <ul className={styles.menuWrap}>
                <li className={`${styles.menu} ${styles.exit}`}>나가기</li>
                <li className={styles.menu}>신고하기</li>
                <li className={styles.menu} onClick={() => setMenuDrop(false)}>닫기</li>
            </ul>
        </div>
    );
};

export default ChatMenuDropDown;