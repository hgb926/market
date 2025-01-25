import React from 'react';
import styles from "../../styles/pages/Posts.module.scss";
import {IoChatbubbleEllipsesSharp} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../store/ui/UiSlice";

const Post = ({post}) => {

    const dispatch = useDispatch();

    const renderHandler = () => {
        dispatch(uiActions.changeRenderStatus(false))
    }

    return (
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
                    {post.tradeType === "SELL" &&
                        <>
                            {post.status === "RESERVED" && <span className={styles.reserved}>예약중</span>}
                            {post.status === "SOLD" && <span className={styles.sold}>판매 완료</span>}
                            <span className={styles.price}>
                                {post.price.toLocaleString('ko-KR')}원
                            </span>
                        </>
                    }
                    {post.tradeType === "SHARE" &&
                        <>
                            {post.status === "RESERVED" && <span className={styles.reserved}>예약중</span>}
                            {post.status === "SOLD" && <span className={styles.sold}>나눔 완료</span>}
                            <span className={styles.share}>
                                나눔
                            </span>
                        </>
                    }
                </div>
            </div>
            <div className={styles.icons}>
                <span><IoChatbubbleEllipsesSharp/> {post.chats}</span>
                <span><FaHeart/>️ {post.likes.length || 0}</span>
            </div>
        </Link>
    );
};

export default Post;