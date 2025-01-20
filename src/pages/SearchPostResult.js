import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/PostSearchPage.module.scss'
import SearchHeader from "../components/search/SearchHeader";
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import {POST_URL} from "../config/host-config";
import PostsSkeleton from "../skeleton/PostsSkeleton";
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";


const SearchPostResult = () => {

    const {keyword} = useParams()
    console.log(keyword)
    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await fetch(`${POST_URL}/search/${keyword}`);
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
        })()
    }, []);



    return (
        <div className={styles.container}>
            <SearchHeader keyword={keyword}/>
            {loading ? <PostsSkeleton/> : <div className={styles.container}>
                {posts.length ? posts.map((post) => (
                    <Link
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
                                {post.tradeType === "sell" ? '' : "나눔"}
                            </span>
                            </div>
                        </div>
                        <div className={styles.icons}>
                            <span><IoChatbubbleEllipsesSharp/> {post.chats}</span>
                            <span><FaHeart/>️ {post.likes.length || 0}</span>
                        </div>
                    </Link>
                )) :
                    <div className={styles.noContent}>"{keyword}" 검색 결과 0건</div>
                }
            </div>
            }
        </div>
    );
};

export default SearchPostResult;