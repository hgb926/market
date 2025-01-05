import React from 'react';
import styles from '../styles/pages/PostDetail.module.scss'
import {useLocation} from "react-router-dom";
import PostDetailNavigation from "../components/PostDetailNavigation";
import {FaHeart} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";

const PostDetail = () => {
    const location = useLocation();
    const {post} = location.state || {} // Link태그로 전달된 데이터를 받는 법
    console.log(post)
    const dispatch = useDispatch();
    let {pathname} = useLocation();
    const urls = [
        '/', '/chat', '/map', '/info'
    ]
    if (urls.some(u => u !== pathname)) {
        dispatch(uiActions.changeRenderStatus(false))
    }
    const obj = {
            id: 2,
            image: ['https://img.kr.gcp-karroter.net/origin/article/202501/17359995530578a13ef65b52485394ee0a2f9ea7e4358b63c668ca74e52e7c213dcce68caeec30.jpg?f=webp&q=95&s=1440x1440&t=inside'],
            title: '안입는 후드티 팔아요',
            location: '불당동',
            time: '4시간 전',
            price: '50,000원',
            likes: 8,
            comments: 0,
            status: '',
            distance: '2.3km',
            suggestFlag: false,
            content: '사이즈 미스로 판매합니다. 몇 번 안 입었습니다.',
            viewCount: 95,
            hearts: 10,
            category: '패션'
        }

    // Spring에서 api로 받아와야함
    const seller = {
        username: '초롱이',
        profile: 'https://img.kr.gcp-karroter.net/origin/article/202412/1733451153511cfa180a62709b757a8bccedfc16b14cee31efb477df8f683b00f7770b8e6f8080.jpg?f=webp&q=95&s=1440x1440&t=inside'
    }

    return (
        <>
            <div className={styles.container}>
                <PostDetailNavigation/>
                <img className={styles.pic} src={post.image} alt={post.title}/>
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
        </>
    );
};

export default PostDetail;