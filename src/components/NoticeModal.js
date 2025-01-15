import React, {useEffect, useState} from 'react';
import styles from '../styles/components/NoticeModal.module.scss';
import ReactDOM from 'react-dom';
import {NOTICE_URL} from "../config/host-config";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sseActions} from "./store/user/SseSlice";


const NoticeModal = ({setOpenNotice}) => {

    const userId = localStorage.getItem('id');
    const navi = useNavigate();
    const [noticeList, setNoticeList] = useState([])
    const newNotice = useSelector(state => state.sse.notice);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    dispatch(sseActions.clearNewNotice())

    const getNoticeList = async () => {
        if (!userId) return
        setLoading(true)
        const response = await fetch(`${NOTICE_URL}/${userId}`);
        if (response.status === 200) {
            let responseData = await response.json();
            console.log(responseData)
            setNoticeList(responseData)
            setLoading(false)
        }
    }

    useEffect(() => {
        getNoticeList()
    }, []);


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

    const noticeClickHandler = async (postId, noticeId, clickStatus) => {
        if (!clickStatus) { // 아직 클릭하지 않았다면
            let response = await fetch(`${NOTICE_URL}/click`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ noticeId }), // JSON 형태로 변환
            });

            if (response.status === 200) {

                setNoticeList((prevList) =>
                    prevList.map((notice) =>
                        notice._id === noticeId ? { ...notice, isClicked: true } : notice
                    )
                );
            }
        }

        // 해당 게시글로 이동
        navi(`post/${postId}`);
    };
    useEffect(() => {
        setNoticeList(prev => [...prev, newNotice])
    }, [newNotice]);

    const allReadHandler = async () => {
        try {
            let response = await fetch(`${NOTICE_URL}/click-all`,{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({writerId: userId})
            });
            if (response.status === 200) {
        setNoticeList((prevList) =>
            prevList.map((notice) => ({
                ...notice, // 기존 notice 객체 복사
                isClicked: true, // isClicked만 업데이트
            }))
        );
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) return <div>로딩중</div>

    // 알림 없을때 처리도 해야함
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={outerClickHandler}>
            <div className={styles.container} onClick={innerClickHandler}>
                <p
                    className={styles.allRead}
                    onClick={allReadHandler}
                >
                    모두 읽기
                </p>
                {noticeList.slice().reverse().map((notice) => (
                    <div
                        className={`${styles.noticeContainer} ${notice.isClicked ? styles.isClicked : ""}`}
                        key={notice._id}
                        onClick={() => noticeClickHandler(notice.postId, notice._id, notice.isClicked)}
                    >
                        <div
                            className={styles.image}
                            style={{
                                backgroundImage: `url(${notice.postImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className={styles.description}>
                            <p className={styles.title}>
                                <span className={styles.userName}>{notice.senderNickname}</span>
                                님께서
                                {notice.postTitle && <span className={styles.postTitle}>
                                    "{notice.postTitle.length > 9 ? notice.postTitle.slice(0, 10) + "..." : notice.postTitle}"
                                </span>}
                                글을 좋아합니다.
                            </p>
                            <p className={styles.time}>{notice.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default NoticeModal;