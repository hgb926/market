import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/PostSearchPage.module.scss'
import SearchHeader from "../components/search/SearchHeader";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import {POST_URL} from "../config/host-config";
import PostsSkeleton from "../skeleton/PostsSkeleton";
import Post from "../components/post/Post";


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

    const renderHandler = () => {
        dispatch(uiActions.changeRenderStatus(false))
    }

    return (
        <div className={styles.container}>
            <SearchHeader keyword={keyword}/>
            {loading ? <PostsSkeleton/> : <div className={styles.postContainer}>
                {posts.length ? posts.map((post) => (
                        <Post post={post}/>
                )) :
                    <div className={styles.noContent}>"{keyword}" 검색 결과 0건</div>
                }
            </div>
            }
        </div>
    );
};

export default SearchPostResult;