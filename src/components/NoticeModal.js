import React, {useState} from 'react';
import styles from '../styles/components/NoticeModal.module.scss';
import ReactDOM from 'react-dom';

const NoticeModal = ({setOpenNotice}) => {

    const [noticeList, setNoticeList] = useState([{
        _id: "1",
        postImage: 'https://node-forum1217.s3.ap-northeast-2.amazonaws.com/uploads/1736770770118_IMG_6833.jpeg',
        postTitle: "나이키 조던 코발트 블루",
        senderNickname: "달팽이",
        type: "like",
        createdAt: new Date('2025-01-14T11:21:50.705+00:00')
    }])
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
                <p className={styles.allRead}>모두 읽기</p>
                {noticeList.map((notice) => (
                    <div className={styles.noticeContainer} key={notice._id}>
                        <div
                            className={styles.image}
                            style={{
                                backgroundImage: `url(${notice.postImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className={styles.description}>
                            <p className={styles.title}><span className={styles.userName}>{notice.senderNickname}</span>님께서 {notice.postTitle.length > 9 ? notice.postTitle.slice(0,10) + "..." : notice.postTitle}글을 좋아합니다.</p>
                            <p className={styles.time}>{notice.createdAt.toString().slice(0, 6)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default NoticeModal;