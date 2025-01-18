import React from 'react';
import styles from '../../styles/components/MenuListModal.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {CHAT_URL} from "../../config/host-config";
import ReactDOM from "react-dom";


const ChatMenuDropDown = ({ setMenuDrop }) => {

    const {id: roomId} = useParams();
    const navi = useNavigate();


    const outerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setMenuDrop(false); // 외부 클릭 시 모달 닫음
        }
    };


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

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.modalContainer}>
                <div className={styles.reportAndDelete}>
                        <div
                            className={styles.menus}
                            onClick={deleteHandler}
                        >
                            채팅방 종료
                        </div>

                    <div className={styles.menus}>신고</div>
                </div>
                <div className={styles.cancel} onClick={() => setMenuDrop(false)}>취소</div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default ChatMenuDropDown;