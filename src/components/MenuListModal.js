import React from 'react';
import ReactDOM from "react-dom";
import styles from '../styles/components/MenuListModal.module.scss'

const MenuListModal = ({setOpenModal}) => {

    const outerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false); // 외부 클릭 시 모달 닫음
        }
    };

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.modalContainer}>
                <div className={styles.reportAndDelete}>
                    <div className={styles.menus}>신고</div>
                    <div className={styles.menus}>이 사용자의 글 보지 않기</div>
                    <div className={styles.menus}>게시글 삭제</div>
                </div>
                <div className={styles.cancel}>취소</div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default MenuListModal;