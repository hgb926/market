import React from 'react';
import ReactDOM from "react-dom";
import styles from '../../styles/components/MenuListModal.module.scss'

const PostStatusModal = ({setOpenModal, postId}) => {

    const outerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false); // 외부 클릭 시 모달 닫음
        }
    };


    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.modalContainer}>
                <div className={styles.reportAndDelete}>
                    <div className={styles.menus}>판매중</div>
                    <div className={styles.menus}>예약중</div>
                    <div className={styles.menus}>거래 완료</div>
                </div>
                <div className={styles.cancel} onClick={() => setOpenModal(false)}>취소</div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default PostStatusModal;