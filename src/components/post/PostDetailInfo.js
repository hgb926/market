import React, {useState} from 'react';
import styles from "../../styles/pages/PostDetail.module.scss";
import KakaoMap from "../map/KakaoMap";
import {IoIosArrowDown} from "react-icons/io";
import PostStatusModal from "../modals/PostStatusModal";

const PostDetailInfo = ({ post,setShowUserProfile, userId  }) => {

    const [openModal, setOpenModal] = useState(false)

    // tradeType : SELL, SHARE
    // status: RESERVED, SOLD, NOT_SOLD_YET

    return (
        <>
            <div className={styles.subContainer}>
                <div className={styles.sellerWrap}>
                    <img
                        alt={'프로필'}
                        onClick={() => setShowUserProfile(true)}
                        className={styles.userImage}
                        src={post.writerInfo.profileUrl}/>
                    <div className={styles.sellerInfo}>
                        <div className={styles.sellerName}>{post.writerInfo.nickname}</div>
                        <div className={styles.location}>{post.writerInfo.address}</div>
                    </div>
                </div>
                <div className={styles.descriptWrap}>
                    {post.writerId === userId ?
                        <div className={styles.statusBox} onClick={() => setOpenModal(true)}>
                            <span>판매중</span><IoIosArrowDown/>
                        </div>
                        : ''
                    }
                    <h1 className={styles.title}>{post.title}</h1>
                    <span className={styles.category}>{post.category}</span>
                    <span style={{color: '#9f9e9e'}}> · </span>
                    <span className={styles.time}>{post.createdAt}</span>
                    <div className={styles.content}>{post.content}</div>
                    <div className={styles.reactions}>
                        채팅 {post.chats || 0} · 관심 {post.likes.length || 0} · 조회 {post.viewCount || 0}
                    </div>
                    <div className={styles.report}>이 게시글 신고하기</div>
                    <p className={styles.wantLocation}>거래 희망 장소</p>
                    <KakaoMap/>
                </div>
            </div>
            {openModal &&
                <PostStatusModal
                    setOpenModal={setOpenModal}
                    postId={post._id}
                />
            }
        </>

    );
};

export default PostDetailInfo;