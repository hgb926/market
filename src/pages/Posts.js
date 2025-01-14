import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Posts.module.scss';
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import Button from "../ui/Button";
import {POST_URL} from "../config/host-config";
import PostsSkeleton from "../skeleton/PostsSkeleton";


const Posts = () => {

    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(false);
    // 더이상 가져올 데이터가 있는지 확인
    const [isFinish, setIsFinish] = useState(false);

    const userId = localStorage.getItem('id');

    // 로딩 스켈레톤 스크린을 보여줄 개수

    const getPosts = async () => {
        if (isFinish) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${POST_URL}`);
            const posts = await response.json();

            if (response.status === 200) {
                setTimeout(() => {
                    setPosts(posts);
                    setLoading(false); // 스켈레톤 화면 종료
                }, 500); // 500ms 딜레이
            } else {
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setLoading(false); // 에러 발생 시 로딩 종료
        }
    };
    useEffect(() => {
        getPosts()
    }, []);



    const dispatch = useDispatch();

    const renderHandler = () => {
        dispatch(uiActions.changeRenderStatus(false))
    }

    return (
        <>
        {loading ? <PostsSkeleton/> : <div className={styles.container}>
            {posts.map((post) => (
                <Link
                    onClick={renderHandler}
                    to={`/post/${post._id}`}
                    key={post._id}
                    className={styles.post}
                    state={{post}} // props
                >
                    <img src={post.images[0]} alt={post.title} className={styles.image}/>
                    <div className={styles.details}>
                        <h3 className={styles.title}>{post.title}</h3>
                        <p className={styles.meta}>
                            {post.distance && <span>{post.distance}km · </span>}
                            {post.wantPlace} · {post.createdAt}
                        </p>
                        <div>
                            {post.tradeType === "sell" &&
                                <span className={styles.price}>{post.price.toLocaleString('ko-KR')}원</span>}
                            <span
                                className={`${styles.tradeType} ${post.tradeType === "sell" ? styles.tradeType : styles.share}`}>
                                {post.tradeType === "sell" ? '판매' : "나눔"}
                            </span>
                        </div>
                    </div>
                    <div className={styles.icons}>
                        <span><IoChatbubbleEllipsesSharp/> {post.chats}</span>
                        <span><FaHeart/>️ {post.likes}</span>
                    </div>
                </Link>
            ))}
            <Button
                text={'글쓰기'}
                url={'write'}
                userId={userId}
            />
        </div>
        }
        </>
    );
};

export default Posts;