import React from 'react';
import styles from '../../styles/components/ChatMenuDropUp.module.scss'
import {useParams} from "react-router-dom";
import {CHAT_URL} from "../../config/host-config";


const ChatMenuDropDown = ({ setMenuDrop }) => {

    let {id: roomId} = useParams();
    console.log(roomId)

    const deleteHandler = async () => {
        await fetch(`${CHAT_URL}/delete/${roomId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
    }

    return (
        <div className={styles.container}>
            <ul className={styles.menuWrap}>
                <li className={styles.menu}>신고하기</li>
                <li className={styles.menu} onClick={() => setMenuDrop(false)}>닫기</li>
                <li className={`${styles.menu} ${styles.exit}`} onClick={deleteHandler}>나가기</li>
            </ul>
        </div>
    );
};

export default ChatMenuDropDown;