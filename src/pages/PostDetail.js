import React, {useState} from 'react';
import styles from '../styles/pages/PostDetail.module.scss'
import {useLocation} from "react-router-dom";
import PostDetailNavigation from "../components/PostDetailNavigation";
import {FaHeart} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import ImageSlider from "../components/ImageSlider";

const PostDetail = () => {
    const location = useLocation();
    const {post} = location.state || {} // Link태그로 전달된 데이터를 받는 법
    const dispatch = useDispatch();
    let {pathname} = useLocation();
    const [showImages, setShowImages] = useState(false)
    const urls = [
        '/', '/chat', '/map', '/info'
    ]
    if (urls.some(u => u !== pathname)) {
        dispatch(uiActions.changeRenderStatus(false))
    }

    // Spring에서 api로 받아와야함
    const seller = {
        username: '초롱이',
        profile: 'https://img.kr.gcp-karroter.net/origin/article/202412/1733451153511cfa180a62709b757a8bccedfc16b14cee31efb477df8f683b00f7770b8e6f8080.jpg?f=webp&q=95&s=1440x1440&t=inside'
    }

    return (
        <>
            {!showImages ? (<>
                    <div className={styles.container}>
                        <PostDetailNavigation/>
                        <img className={styles.pic}
                             onClick={() => setShowImages(true)}
                             src={post.image[0]}
                             alt={post.title}/>
                        <div className={styles.subContainer}>
                            <div className={styles.sellerWrap}>
                                <img alt={'프로필'} className={styles.userImage}
                                     src={seller.profile}/>
                                <div className={styles.sellerInfo}>
                                    <div className={styles.sellerName}>{seller.username}</div>
                                    <div className={styles.location}>{post.location}</div>
                                </div>
                            </div>
                            <div className={styles.descriptWrap}>
                                <h1 className={styles.title}>{post.title}</h1>
                                <span className={styles.category}>{post.category}</span>
                                <span style={{color: '#9f9e9e'}}> · </span>
                                <span className={styles.time}>{post.time}</span>
                                <div className={styles.content}>{post.content}</div>
                                <p className={styles.wantLocation}>거래 희망 장소</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomBar}>
                        <div className={styles.bottomMain}>
                            <div className={styles.heart}><CiHeart className={styles.icon}/>️</div>
                            <div className={styles.descript}>
                                <span className={styles.price}>{post.price}</span>
                                {post.suggestFlag && <span className={styles.flag}>가격 제안 불가</span>}
                            </div>
                            <div></div>
                            <div className={styles.chat}>
                                채팅하기
                            </div>
                        </div>
                    </div>
                </>) :
                (<ImageSlider
                    images={post.image}
                />)}
        </>
    );
};

export default PostDetail;