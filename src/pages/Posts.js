import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Posts.module.scss';
import Button from "../ui/Button";
import {POST_URL} from "../config/host-config";
import PostsSkeleton from "../skeleton/PostsSkeleton";
import Post from "../components/post/Post";


const Posts = () => {

    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(false);
    // 더이상 가져올 데이터가 있는지 확인

    const userId = localStorage.getItem('id');

    useEffect(() => {

        (async () => {
            setLoading(true);

            try {
                const response = await fetch(`${POST_URL}`);
                const posts = await response.json();

                if (response.status === 200) {
                    setTimeout(() => {
                        setPosts(posts);
                        setLoading(false); // 스켈레톤 화면 종료
                    }, 300); // 500ms 딜레이
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
        <>
        {loading ? <PostsSkeleton/> : <div className={styles.container}>
            {posts.map((post) => (
                <Post post={post}/>
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