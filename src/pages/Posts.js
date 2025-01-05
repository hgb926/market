import React from 'react';
import styles from '../styles/pages/Posts.module.scss';
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";

const postsData = [
    {
        id: 1,
        image: 'https://img.kr.gcp-karroter.net/origin/article/202501/2a38625bbc2f023afc762bff7fd4f636b15675dc722030a808dcd4ac2fceca6d_0.webp?f=webp&q=95&s=1440x1440&t=inside',
        title: '의자 팝니다',
        location: '불당동',
        time: '4시간 전',
        price: '60,000원',
        likes: 3,
        comments: 0,
        status: '',
        distance: '',
    },
    {
        id: 6,
        image: 'https://img.kr.gcp-karroter.net/origin/article/202412/17344089133093df1c2e11a2cc1db0f77173614bb69b6ba11bf68c504b1a1eaa1f26d3c4d31c80.jpg?f=webp&q=95&s=1440x1440&t=inside',
        title: '나이키 에어포스 키즈 올백',
        location: 'gg',
        time: '2시간 전',
        price: '45,000원',
        likes: 0,
        comments: 0,
        status: '',
        distance: '',
    },
    {
        id: 2,
        image: 'https://img.kr.gcp-karroter.net/origin/article/202501/17359995530578a13ef65b52485394ee0a2f9ea7e4358b63c668ca74e52e7c213dcce68caeec30.jpg?f=webp&q=95&s=1440x1440&t=inside',
        title: '안입는 후드티 팔아요',
        location: '불당동',
        time: '4시간 전',
        price: '50,000원',
        likes: 8,
        comments: 0,
        status: '',
        distance: '2.3km',
    },
    {
        id: 3,
        image: 'https://img.kr.gcp-karroter.net/origin/article/202411/7157ccaf1a3355fa1065188543b12d695e56d816806357ac761afd3cec7e451f.jpg?f=webp&q=95&s=1440x1440&t=inside',
        title: '매트리스',
        location: '불당동',
        time: '5시간 전',
        price: '66,000원',
        likes: 16,
        comments: 3,
        status: '거래완료',
        distance: '3km',
    },
    {
        id: 4,
        image: 'https://img.kr.gcp-karroter.net/origin/article/202412/1733451153511cfa180a62709b757a8bccedfc16b14cee31efb477df8f683b00f7770b8e6f8080.jpg?f=webp&q=95&s=1440x1440&t=inside',
        title: '맥북 나눔합니다',
        location: '두정동',
        time: '3시간 전',
        price: '나눔🧡',
        likes: 3,
        comments: 2,
        status: '',
        distance: '',
    },
    {
        id: 5,
        image: 'https://img.kr.gcp-karroter.net/origin/article/202412/17354922971878f7157301018f2e29eecd79e26ed2181230ad08a44bbf8ee0e0cb6401f3af6e40.jpg?f=webp&q=95&s=1440x1440&t=inside',
        title: '칼하트 후드티',
        location: '두정동',
        time: '2시간 전',
        price: '45,000원',
        likes: 0,
        comments: 0,
        status: '',
        distance: '',
    },
];

const Posts = () => {
    return (
        <div className={styles.container}>
            {postsData.map((post) => (
                <div key={post.id} className={styles.post}>
                    <img src={post.image} alt={post.title} className={styles.image} />
                    <div className={styles.details}>
                        <h3 className={styles.title}>{post.title}</h3>
                        <p className={styles.meta}>
                            {post.distance && <span>{post.distance} · </span>}
                            {post.location} · {post.time}
                        </p>
                        {post.status ? (
                            <span className={styles.status}>{post.status}</span>
                        ) : (
                            <span className={styles.price}>{post.price}</span>
                        )}
                    </div>
                    <div className={styles.icons}>
                        <span><IoChatbubbleEllipsesSharp /> {post.comments}</span>
                        <span><FaHeart />️ {post.likes}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;