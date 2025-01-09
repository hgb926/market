import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Posts.module.scss';
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import Button from "../ui/Button";
import {POST_URL} from "../config/host-config";


// writer id 넣어야함
const postsData = [
    {
        id: 1,
        writerId: 2,
        image: ['https://img.kr.gcp-karroter.net/origin/article/202501/2a38625bbc2f023afc762bff7fd4f636b15675dc722030a808dcd4ac2fceca6d_0.webp?f=webp&q=95&s=1440x1440&t=inside', 'https://img.kr.gcp-karroter.net/origin/article/202501/ab36fe167da7f97a16ff8efc42ec217379faaebd0020d3fe8037a2508cbea7ea_0.webp?f=webp&q=95&s=1440x1440&t=inside', 'https://img.kr.gcp-karroter.net/origin/article/202501/173590830532792eb6c3c87dc6ac56d5794bf9cedb3963d6402d6b9feb8af0634d923ba84b28d0.jpg?f=webp&q=95&s=1440x1440&t=inside'],
        title: '의자 팝니다',
        location: '불당동',
        time: '4시간 전',
        price: '60,000원',
        likes: 3,
        chats: 0,
        status: '',
        distance: '2.3km',
        suggestFlag: true,
        content: '편안한 의자 4개 팝니다. 사용감은 있지만 튼튼합니다.',
        viewCount: 120,
        category: '가구'
    },
    {
        id: 6,
        image: ['https://img.kr.gcp-karroter.net/origin/article/202412/17344089133093df1c2e11a2cc1db0f77173614bb69b6ba11bf68c504b1a1eaa1f26d3c4d31c80.jpg?f=webp&q=95&s=1440x1440&t=inside', 'https://img.kr.gcp-karroter.net/origin/article/202411/1732675429600c453ff9f886e47e060f5e826a275573d41a0315ee1e64c08c17dfb10320a4c5a0.jpg?f=webp&q=95&s=1440x1440&t=inside', 'https://img.kr.gcp-karroter.net/origin/article/202412/17344089133073df1c2e11a2cc1db0f77173614bb69b6ba11bf68c504b1a1eaa1f26d3c4d31c80.jpg?f=webp&q=95&s=1440x1440&t=inside'],
        title: '나이키 에어포스 키즈 올백',
        location: '청수동',
        time: '2시간 전',
        price: '45,000원',
        likes: 0,
        chats: 0,
        status: '',
        distance: '5.3km',
        suggestFlag: true,
        content: '나이키 에어포스 키즈 올백 팝니다. 거의 새 상품입니다.',
        viewCount: 75,
        hearts: 5,
        category: '패션'
    },
    {
        id: 2,
        image: ['https://img.kr.gcp-karroter.net/origin/article/202501/17359995530578a13ef65b52485394ee0a2f9ea7e4358b63c668ca74e52e7c213dcce68caeec30.jpg?f=webp&q=95&s=1440x1440&t=inside'],
        title: '안입는 후드티 팔아요',
        location: '불당동',
        time: '4시간 전',
        price: '50,000원',
        likes: 8,
        chats: 0,
        status: '',
        distance: '2.3km',
        suggestFlag: false,
        content: '사이즈 미스로 판매합니다. 몇 번 안 입었습니다.',
        viewCount: 95,
        hearts: 10,
        category: '패션'
    },
    {
        id: 3,
        image: ['https://img.kr.gcp-karroter.net/origin/article/202411/7157ccaf1a3355fa1065188543b12d695e56d816806357ac761afd3cec7e451f.jpg?f=webp&q=95&s=1440x1440&t=inside', 'https://dnvefa72aowie.cloudfront.net/origin/article/202408/f76e22b0f4dbcc1a8f6d495ae1b05f877a0dad53b1e7468390c07d26c1f3e476.jpg?f=webp&q=95&s=1440x1440&t=inside'],
        title: '매트리스',
        location: '불당동',
        time: '5시간 전',
        price: '66,000원',
        likes: 16,
        chats: 3,
        status: '거래완료',
        distance: '3km',
        suggestFlag: false,
        content: '매트리스 판매합니다. 상태 좋습니다.',
        viewCount: 200,
        category: '가구'
    },
    {
        id: 4,
        image: ['https://img.kr.gcp-karroter.net/origin/article/202412/1733451153511cfa180a62709b757a8bccedfc16b14cee31efb477df8f683b00f7770b8e6f8080.jpg?f=webp&q=95&s=1440x1440&t=inside', 'https://img.kr.gcp-karroter.net/origin/article/202412/173554460896452e2e172d6db8a912b0832e8511f4f89552a78504783b97d3d5513bb906b6dfa0.jpg?f=webp&q=95&s=1440x1440&t=inside', 'https://dnvefa72aowie.cloudfront.net/origin/article/202310/0f78d1a033a1b9110a11f8b737090d73163b622a1731f354be8006df1b9c21f0.jpg?f=webp&q=95&s=1440x1440&t=inside'],
        title: '맥북 나눔합니다',
        location: '두정동',
        time: '3시간 전',
        price: '나눔',
        likes: 3,
        chats: 2,
        status: '',
        distance: '0.9km',
        suggestFlag: true,
        content: '사용하지 않는 맥북 나눔합니다. 직접 오셔서 가져가세요.',
        viewCount: 180,
        hearts: 20,
        category: '전자기기'
    },
    {
        id: 5,
        image: ['https://img.kr.gcp-karroter.net/origin/article/202412/17354922971878f7157301018f2e29eecd79e26ed2181230ad08a44bbf8ee0e0cb6401f3af6e40.jpg?f=webp&q=95&s=1440x1440&t=inside'],
        title: '칼하트 후드티',
        location: '두정동',
        time: '2시간 전',
        price: '45,000원',
        likes: 0,
        chats: 0,
        status: '',
        distance: '1.1km',
        suggestFlag: false,
        content: '칼하트 후드티 판매합니다. 사이즈는 XL입니다.',
        viewCount: 60,
        hearts: 3,
        category: '패션'
    },
];

const Posts = () => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        let response = await fetch(`${POST_URL}`);
        console.log(response)
        let posts = await response.json();
        setPosts(posts);
    }
    // useEffect(() => {
    //     getPosts()
    // }, []);
    // getPosts()

    const dispatch = useDispatch();

    const renderHandler = () => {
        dispatch(uiActions.changeRenderStatus(false))
    }

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <Link
                    onClick={renderHandler}
                    to={`/post/${post._id}`}
                    key={post._id}
                    className={styles.post}
                    state={{ post }} // props
                >
                    <img src={post.images[0]} alt={post.title} className={styles.image} />
                    <div className={styles.details}>
                        <h3 className={styles.title}>{post.title}</h3>
                        <p className={styles.meta}>
                            {post.distance && <span>{post.distance} · </span>}
                            {post.wantPlace} · {post.createdAt}
                        </p>
                        {post.status ? (
                            <span className={styles.status}>{post.status}</span>
                        ) : (
                            <span className={styles.price}>{post.price}</span>
                        )}
                    </div>
                    <div className={styles.icons}>
                        <span><IoChatbubbleEllipsesSharp /> {post.chats}</span>
                        <span><FaHeart />️ {post.likes}</span>
                    </div>
                </Link>
            ))}
            <Button
                text={'글쓰기'}
                url={'write'}
            />
        </div>
    );
};

export default Posts;