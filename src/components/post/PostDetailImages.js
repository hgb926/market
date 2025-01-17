import React from 'react';
import styles from "../../styles/pages/PostDetail.module.scss";
import ControlArrow from "../ControlArrow";
import Dots from "../Dots";

const PostDetailImages = ({ post, checkClickTarget, currentIndex, changeImage }) => {
    return (
        <div>
            <div
                className={styles.picWrapper}
                onClick={(e) => checkClickTarget(e)}
            >
                <div
                    className={styles.pic}
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`, // 슬라이드 이동
                    }}
                >
                    {post.images.map((image, idx) => (
                        <div
                            key={idx}
                            className={styles.slide}
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                    ))}
                </div>
                {post.images.length > 1 && (
                    <ControlArrow changeImg={changeImage} />
                )}
                <Dots length={post.images.length} currentIdx={currentIndex} />
            </div>
        </div>
    );
};

export default PostDetailImages;