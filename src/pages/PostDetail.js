import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/PostDetail.module.scss'
import {useLocation, useParams} from "react-router-dom";
import PostDetailNavigation from "../components/navigations/PostDetailNavigation";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import ImageSlider from "../ui/ImageSlider";
import ShowUserImage from "../ui/ShowUserImage";
import {POST_URL} from "../config/host-config";
import PostDetailSkeleton from "../skeleton/PostDetailSkeleton";
import PostDetailImages from "../components/post/PostDetailImages";
import PostDetailInfo from "../components/post/PostDetailInfo";
import PostBottomSection from "../components/post/PostBottomSection";

const PostDetail = () => {

    const {id: postId} = useParams();
    const dispatch = useDispatch();
    let {pathname} = useLocation();
    const userId = localStorage.getItem('id');
    const [showImages, setShowImages] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [isLike, setIsLike] = useState(false)
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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: postId})
            });
            if (response.status === 200) {
                const responseData = await response.json();

                console.log(responseData)
                setTimeout(() => {
                    setPost(responseData)
                    console.log(responseData)
                    setIsLike(responseData.likes.includes(userId))
                    setLoading(false)
                }, 300)
            } else {
                const errorData = await response.json();
                throw new Response(JSON.stringify(errorData), {
                    status: response.status,
                    statusText: response.statusText
                });
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


    if (loading) return <PostDetailSkeleton/>;

    return (
        <>
            {!showImages && post ? (<>
                    <div className={styles.container}>
                        <PostDetailNavigation
                            writerId={post.writerId}
                            postId={post._id}
                        />
                        <PostDetailImages
                            checkClickTarget={checkClickTarget}
                            changeImage={changeImage}
                            post={post}
                            currentIndex={currentIndex}
                        />
                        <PostDetailInfo
                            userId={userId}
                            post={post}
                            setShowUserProfile={setShowUserProfile}
                        />
                    </div>
                    <PostBottomSection
                        post={post}
                        isLike={isLike}
                        setIsLike={setIsLike}
                    />
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