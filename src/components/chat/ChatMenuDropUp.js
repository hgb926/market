import React from 'react';
import styles from '../../styles/components/ChatMenuDropUp.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {CHAT_URL} from "../../config/host-config";


const ChatMenuDropDown = ({ setMenuDrop }) => {

    const {id: roomId} = useParams();
    const navi = useNavigate();

    const deleteHandler = async () => {

        const response = await fetch(`${CHAT_URL}/delete/${roomId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        console.log(response)
        if (response.status === 200) {
            alert('대화가 종료되었습니다')
            navi(-1)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.menuWrap}>
                <div className={styles.menu}>신고하기</div>
                <div className={styles.menu} onClick={() => setMenuDrop(false)}>닫기</div>
                <div className={`${styles.menu} ${styles.exit}`} onClick={deleteHandler}>나가기</div>
            </div>
        </div>
    );
};

export default ChatMenuDropDown;