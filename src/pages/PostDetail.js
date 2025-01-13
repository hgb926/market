import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/PostDetail.module.scss'
import {useLocation, useParams} from "react-router-dom";
import PostDetailNavigation from "../components/PostDetailNavigation";
import {CiHeart} from "react-icons/ci";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import ImageSlider from "../components/ImageSlider";
import ControlArrow from "../components/ControlArrow";
import Dots from "../components/Dots";
import {sliceAddress} from "../utils/sliceAddress";
import ShowUserImage from "../components/ShowUserImage";
import RequestChatBtn from "../components/chat/RequestChatBtn.js";
import {POST_URL} from "../config/host-config";

const PostDetail = () => {

    const {id: postId} = useParams();
    const dispatch = useDispatch();
    let {pathname} = useLocation();
    const userId = localStorage.getItem('id');
    const [showImages, setShowImages] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [post, setPost] = useState('')
    const [loading, setLoading] = useState(true)
    const urls = [
        '/', '/chat', '/map', '/info'
    ]
    if (urls.some(u => u !== pathname)) {
        dispatch(uiActions.changeRenderStatus(false))
    }

    const getPost = async () => {
        try {
            const response = await fetch(`${POST_URL}/detail`, {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({id: postId})
            });
            if (response.status === 200) {
                const responseData = await response.json();
                setPost(responseData)
                setLoading(false)
            } else {

            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getPost()
    }, []);


    const changeShowImage = (flag) => {
        setShowImages(flag)
    }

    const changeShowUserImage = (flag) => {
        setShowUserProfile(flag)
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
    if (loading) return <div>로딩중</div>;

    return (
        <>
            {!showImages && post ? (<>
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
                                {post.images.length > 1 &&
                                    <ControlArrow
                                        changeImg={changeImage}
                                    />}
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
                    </div>
                    <div className={styles.bottomBar}>
                        <div className={styles.bottomMain}>
                            <div className={styles.heart}><CiHeart className={styles.icon}/>️</div>
                            <div className={styles.descript}>
                                {post.tradeType === "sell" ?
                                    <>
                                        <span className={styles.price}>{post.price.toLocaleString('ko-KR')}원</span>
                                        <span className={styles.flag}>{post.suggestFlag ? '가격 제안 불가' : '가격 제한 가능'}</span>
                                    </>
                                    :
                                    <span className={styles.price}>나눔!</span>}
                            </div>

                            {userId !== post.writerId &&
                                <RequestChatBtn
                                    post={post}
                                />
                            }
                        </div>
                    </div>
                </>) :
                (<ImageSlider
                    images={post.images}
                    changeShowImage={changeShowImage}
                    currentIdx={currentIndex}
                />)}
            {showUserProfile && (<ShowUserImage
                image={post.writerInfo.profileUrl}
                changeShowUserImage={changeShowUserImage}
            />)}
        </>
    );
};


export default PostDetail;