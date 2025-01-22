import React, { useState } from 'react';
import styles from '../styles/pages/Map.module.scss';
import KakaoMap from "../components/map/KakaoMap";
import { useSelector } from "react-redux";
import { RiMapPin2Fill } from "react-icons/ri";
import { sliceDetailAddress, sliceTownName } from '../utils/sliceAddress';


const MapPage = () => {
    const userData = useSelector(state => state.userInfo.userData);
    const townName = sliceTownName(userData.address)
    const [activeCategory, setActiveCategory] = useState('먹거리'); // 현재 활성화된 카테고리 상태

    const categoryClickHandler = (category) => {
        setActiveCategory(category);
    };


    const dummyPosts = [
        {
            id: 2,
            title: `자리변경 팔천순대 ${townName}동 하나마트`,
            description: "찰순대 소: 6000원 중: 8000원",
            imageUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjlfMTg0%2FMDAxNzI0OTM2ODI3MTIy.qI5wYHjrzKRRTOfu3oiypgPr-VWwx4iE9qgwTCj4a6Eg.HWm7qS9gnLiubgq7rrJYMPeKyEvnVTr1aZNRf-19GFIg.PNG%2F%253F%2588%259C%253F%253F3.PNG&type=a340",
            date: "13일 전",
            location: `${townName} 팔천순대 9200`,
        },
        {
            id: 3,
            title: `${townName}동 점심특선 짬뽕 5000원`,
            description: "안녕하세요! 아찌카세입니다! 😊 저희는...",
            imageUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMTBfNzkg%2FMDAxNzMzODEwMjkzMDQ0.rheQvS9Fqk3uAhXTxhUpea1zHdSrkcOkSXDAA2dQV00g.gMvIP4Se43d0A7mFYIw711EgL5lLQJ5SI_ltqimFeN4g.JPEG%2FKakaoTalk_20241210_141153569_03.jpg&type=a340",
            date: "3일 전",
            location: "아찌카세",
        },
        {
            id: 1,
            title: `대하마트 ${townName}점 전단세일`,
            description: "문의는 매장으로 부탁드려요. 전화주문...",
            imageUrl: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn2.ppomppu.co.kr%2Fzboard%2Fdata3%2F2023%2F0113%2F900w_20230113143736_VfI2PSTZZi.jpg&type=sc960_832",
            date: "5일 전",
            location: `대하마트 ${townName}점`,
        },
    ];

    return (
        <div className={styles.container}>
            <KakaoMap search={true} />
            <div className={styles.bottomContainer}>
                <p className={styles.location}>
                    <RiMapPin2Fill className={styles.icon} />
                    <p>{sliceDetailAddress(userData.address)}</p>
                </p>
                <div className={styles.categoryContainer}>
                    <p className={styles.location}>{sliceTownName(userData.address)} 업체 소식</p>
                    <div className={styles.categories}>
                        {['먹거리', '미용', '건강', '교육', '생활', '전체'].map((category) => (
                            <div
                                key={category}
                                className={`${styles.category} ${activeCategory === category ? styles.active : ''}`}
                                onClick={() => categoryClickHandler(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.postsContainer}>
                    {dummyPosts.map(post => (
                        <div key={post.id} className={styles.post}>
                            <img src={post.imageUrl} alt={post.title} className={styles.image} />
                            <div className={styles.details}>
                                <p className={styles.location}>{post.location}</p>
                                <h3 className={styles.title}>{post.title}</h3>
                                <p className={styles.description}>{post.description}</p>
                                <p className={styles.date}>{post.date}</p>
                            </div>
                        </div>
                    ))}
                    <button className={styles.moreButton}>더보기</button>
                </div>
            </div>
        </div>
    );
};

export default MapPage;