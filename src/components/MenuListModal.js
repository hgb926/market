import React from 'react';
import ReactDOM from "react-dom";
import styles from '../styles/components/MenuListModal.module.scss'
import {POST_URL} from "../config/host-config";
import {useNavigate} from "react-router-dom";

const MenuListModal = ({setOpenModal, writerId, postId}) => {

    const userId = localStorage.getItem('id') || '';
    const navi = useNavigate()
    const outerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false); // 외부 클릭 시 모달 닫음
        }
    };

    const deleteHandler = async () => {

        try {

            const response = await fetch(`${POST_URL}/${postId}`, {
                method: "DELETE",
            });
            if (response.status === 200) {
                alert('게시글이 성공적으로 삭제되었습니다.')
                navi('/')
            } else {
                alert('게시글 삭제 실패!')
            }
        } catch (e) {
            console.error(e)
        }
    }

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.modalContainer}>
                <div className={styles.reportAndDelete}>
                    <div className={styles.menus}>신고</div>
                    <div className={styles.menus}>이 사용자의 글 보지 않기</div>
                    {/*{writerId === userId &&*/}
                        <div
                            className={styles.menus}
                            onClick={deleteHandler}
                        >
                            게시글 삭제
                        </div>
                    {/*}*/}
                </div>
                <div className={styles.cancel} onClick={() => setOpenModal(false)}>취소</div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default MenuListModal;