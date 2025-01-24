import React, {useEffect, useState} from 'react';
import styles from '../../styles/pages/ChatRoom.module.scss';
import {useNavigate} from "react-router-dom";
import {IoIosArrowDown} from "react-icons/io";
import {convertStatusToKorean} from "../../utils/convertStatusToOtherLang";
import PostStatusModal from "../modals/PostStatusModal";
import {CHAT_URL} from "../../config/host-config";

const PostInfo = ({chat}) => {

    const userId = localStorage.getItem('id');
    const [openModal, setOpenModal] = useState(false)
    const [postData, setPostData] = useState(chat.postInfo);

    const updateStatus = (newStatus) => {
        setPostData((prev) => ({ ...prev, status: newStatus }));
    };
    const [status, setStatus] = useState(convertStatusToKorean(postData.tradeType, postData.status))

    const navi = useNavigate();

    useEffect(() => {
        if (!userId) return;

        console.log(`room sse 요청 시작, ${userId}`);
        const eventSource = new EventSource(`${CHAT_URL}/sse/room/post-status?userId=${userId}`);

        eventSource.onmessage = (event) => {
            const newStatus = JSON.parse(event.data);
            setStatus(convertStatusToKorean(postData.tradeType, newStatus));
        };

        eventSource.onerror = () => {
            console.log('연결 끊김, 재연결 시도 중...');
        };

        return () => {
            eventSource.close();
        };
    }, [userId]);



    return (
        <div className={styles.postContainer}>
            <div
                className={styles.postImg}
                onClick={() => navi(`/post/${chat.postInfo.postId}`)}
                style={{
                    backgroundImage: `url(${chat.postInfo.postImage})`,
                }}
            />
            <div className={styles.postMetaData}>
                <div className={styles.topWrap}>
                    { chat.sellerInfo.sellerId === userId ?
                        <span className={styles.sellerStatus} onClick={() => setOpenModal(true)}>
                            <span>{status}</span><IoIosArrowDown/>
                        </span>
                        :
                        <span className={styles.status}>
                            {status}
                        </span>
                    }
                    <p className={styles.title}
                       onClick={() => navi(`/post/${chat.postInfo.postId}`)}>{chat.postInfo.postTitle}</p>
                </div>
                {chat.postInfo.tradeType === "SELL" ? <div className={styles.price}>
                    {chat.postInfo.postPrice.toLocaleString('ko-KR')}원
                </div> : ''}
            </div>
            {openModal &&
                <PostStatusModal
                    setOpenModal={setOpenModal}
                    postId={chat.postInfo.postId}
                    tradeType={chat.postInfo.tradeType}
                    updateStatus={updateStatus}
                />
            }
        </div>
    );
}

export default PostInfo;