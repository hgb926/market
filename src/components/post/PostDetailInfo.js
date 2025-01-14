import React from 'react';
import styles from "../../styles/pages/PostDetail.module.scss";
import {sliceAddress} from "../../utils/sliceAddress";

const PostDetailInfo = ({ post,setShowUserProfile  }) => {
    return (
        <div className={styles.subContainer}>
            <div className={styles.sellerWrap}>
                <img
                    alt={'프로필'}
                    onClick={() => setShowUserProfile(true)}
                    className={styles.userImage}
                    src={post.writerInfo.profileUrl}/>
                <div className={styles.sellerInfo}>
                    <div className={styles.sellerName}>{post.writerInfo.nickname}</div>
                    <div className={styles.location}>{sliceAddress(post.writerInfo.address)}</div>
                </div>
            </div>
            <div className={styles.descriptWrap}>
                <h1 className={styles.title}>{post.title}</h1>
                <span className={styles.category}>{post.category}</span>
                <span style={{color: '#9f9e9e'}}> · </span>
                <span className={styles.time}>{post.createdAt}</span>
                <div className={styles.content}>{post.content}</div>
                <p className={styles.wantLocation}>거래 희망 장소</p>
                <div className={styles.map}>{post.wantPlace}</div>
            </div>
        </div>
    );
};

export default PostDetailInfo;