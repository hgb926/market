import React, {useState} from 'react';
import styles from '../styles/pages/PostDetail.module.scss'
import {useLocation} from "react-router-dom";
import PostDetailNavigation from "../components/PostDetailNavigation";
import {FaHeart} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import ImageSlider from "../components/ImageSlider";
import ControlArrow from "../components/ControlArrow";
import Dots from "../components/Dots";

const PostDetail = () => {
    const location = useLocation();
    const {post} = location.state || {} // Link태그로 전달된 데이터를 받는 법
    const dispatch = useDispatch();
    let {pathname} = useLocation();
    const [showImages, setShowImages] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스
    const [images, setImages] = useState(post.image)
    const urls = [
        '/', '/chat', '/map', '/info'
    ]
    if (urls.some(u => u !== pathname)) {
        dispatch(uiActions.changeRenderStatus(false))
    }


    // Spring에서 api로 받아와야함
    const {writerInfo : seller} = post
    console.log(seller)

    const changeShowImage = (flag) => {
        setShowImages(flag)
    }

    // 이미지 변경 함수
    const changeImage = (type) => {
        if (type === 'prev') {
            setCurrentIndex(prev => (prev === 0 ? post.images.length - 1 : prev - 1));
        } else if (type === 'next') {
            setCurrentIndex(prev => (prev === post.images.length - 1 ? 0 : prev + 1));
        }
    };

    const checkClickTarget = (e) => {
        if (e.target.tagName === 'svg') {
            return setShowImages(false)
        }
        setShowImages(true)
    }

    return (
        <>
            {!showImages ? (<>
                    <div className={styles.container}>
                        <PostDetailNavigation/>
                        <div>
                            <div className={styles.pic}
                                 onClick={(e) => checkClickTarget(e)}
                                 style={{
                                     backgroundImage: `url(${post.images[currentIndex]})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center'
                                 }}>
                                <ControlArrow
                                    changeImg={changeImage}
                                />
                                <Dots
                                    length={post.images.length}
                                    currentIdx={currentIndex}
                                />
                            </div>
                        </div>
                        <div className={styles.subContainer}>
                            <div className={styles.sellerWrap}>
                                <img
                                     alt={'프로필'}
                                     className={styles.userImage}
                                     src={seller.profile}/>
                                <div className={styles.sellerInfo}>
                                    <div className={styles.sellerName}>{seller.nickname}</div>
                                    <div className={styles.location}>{post.wantPlace}</div>
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
                    images={post.images}
                    changeShowImage={changeShowImage}
                    currentIdx={currentIndex}
                />)}
        </>
    );
};

export default PostDetail;