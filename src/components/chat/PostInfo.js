import React from 'react';
import styles from '../../styles/pages/ChatRoom.module.scss';

const PostInfo = ({ chat }) => (
    <div className={styles.postContainer}>
        <div
            className={styles.postImg}
            style={{
                backgroundImage: `url(${chat.postInfo.postImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <div className={styles.postMetaData}>
            <div className={styles.topWrap}>
        <span className={styles.status}>
          {chat.postInfo.tradeType === 'sell' ? '판매 중' : '나눔'}
        </span>
                <p className={styles.title}>{chat.postInfo.postTitle}</p>
            </div>
            <div className={styles.price}>
                {chat.postInfo.postPrice.toLocaleString('ko-KR')}원
            </div>
        </div>
    </div>
);

export default PostInfo;