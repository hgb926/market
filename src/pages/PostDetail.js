import React from 'react';
import styles from '../styles/pages/PostDetail.module.scss'
import {useLocation} from "react-router-dom";
import PostDetailNavigation from "../components/PostDetailNavigation";
import {FaHeart} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";

const PostDetail = () => {
    const location = useLocation();
    const {post} = location.state || {} // Link태그로 전달된 데이터를 받는 법
    const obj = {
        "id": 6,
        "image": "https://img.kr.gcp-karroter.net/origin/article/202412/17344089133093df1c2e11a2cc1db0f77173614bb69b6ba11bf68c504b1a1eaa1f26d3c4d31c80.jpg?f=webp&q=95&s=1440x1440&t=inside",
        "title": "나이키 에어포스 키즈 올백",
        "location": "청수동",
        "time": "2시간 전",
        "price": "45,000원",
        "likes": 0,
        "comments": 0,
        "status": "",
        "distance": "5.3km"
    }

    // Spring에서 api로 받아와야함
    const seller = {
        username: '초롱이',
        image: 'https://img.kr.gcp-karroter.net/origin/article/202412/1733451153511cfa180a62709b757a8bccedfc16b14cee31efb477df8f683b00f7770b8e6f8080.jpg?f=webp&q=95&s=1440x1440&t=inside'
    }

    return (
        <>
            <div className={styles.container}>
                <PostDetailNavigation/>
                <img className={styles.pic} src={post.image} alt={post.title}/>
                <div className={styles.subContainer}>
                    <div className={styles.sellerWrap}>
                        <img alt={'프로필'} className={styles.userImage}
                             src={seller.image}/>
                        <div className={styles.sellerInfo}>
                            <div className={styles.sellerName}>{seller.username}</div>
                            <div className={styles.location}>{post.location}</div>
                        </div>
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