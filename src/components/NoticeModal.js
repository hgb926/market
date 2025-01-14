import React from 'react';
import styles from '../styles/components/NoticeModal.module.scss';
import ReactDOM from 'react-dom';

const NoticeModal = ({ setOpenNotice }) => {

    // 모달 외부 클릭 시 setOpenNotice 실행
    const outerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setOpenNotice(false); // 외부 클릭 시 모달 닫음
        }
    };

    // 모달 내부 클릭 시 이벤트 버블링 방지
    const innerClickHandler = (e) => {
        e.stopPropagation(); // 이벤트가 더 이상 전파되지 않도록 함
    };

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.container} onClick={innerClickHandler}>
                noticeModal
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default NoticeModal;