import React from 'react';
import ReactDOM from "react-dom";
import styles from '../../styles/components/MenuListModal.module.scss'

const PostStatusModal = ({ setOpenModal, postId, tradeType }) => {

    const outerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false); // 외부 클릭 시 모달 닫음
        }
    };

    const menuList = tradeType === "SELL"
        ? ['판매중', '예약중', '판매 완료']
        : ['나눔중', '예약중', '나눔 완료'];

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.modalContainer}>
                <div className={styles.reportAndDelete}>
                    <div className={styles.statusChange}>상태 변경</div>
                    {menuList.map((item, index) => (
                        <div key={index} className={styles.menus}>{item}</div>
                    ))}
                </div>
                <div className={styles.cancel} onClick={() => setOpenModal(false)}>취소</div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default PostStatusModal;