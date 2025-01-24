import React from 'react';
import ReactDOM from "react-dom";
import styles from '../../styles/components/MenuListModal.module.scss'
import {POST_URL} from "../../config/host-config";
import {convertStatusToEng} from '../../utils/convertStatusToOtherLang'

const PostStatusModal = ({ setOpenModal, postId, tradeType, updateStatus }) => {

    const outerClickHandler = (e) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false); // 외부 클릭 시 모달 닫음
        }
    };

    const menuList = tradeType === "SELL"
        ? ['판매중', '예약중', '판매 완료']
        : ['나눔중', '예약중', '나눔 완료'];

    const changeStatus = async (status) => {

        // 한글 -> 영어 변환 필요
        let changedStatus = convertStatusToEng(tradeType, status);
        try {
            let response = await fetch(`${POST_URL}/status`, {
                method: 'POST',
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    postId,
                    status : changedStatus
                })
            });
            if (response.status === 200) {
                updateStatus(changedStatus)
                setOpenModal(false)
            }
        } catch (e) {
            console.error(e)
        }
    }


    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.modalContainer}>
                <div className={styles.reportAndDelete}>
                    <div className={styles.statusChange}>상태 변경</div>
                    {menuList.map((item, index) => (
                        <div
                            key={index}
                            className={styles.menus}
                            onClick={() => changeStatus(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className={styles.cancel} onClick={() => setOpenModal(false)}>취소</div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default PostStatusModal;