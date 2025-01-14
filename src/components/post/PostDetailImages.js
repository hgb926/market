import React from 'react';
import styles from "../../styles/pages/PostDetail.module.scss";
import ControlArrow from "../ControlArrow";
import Dots from "../Dots";

const PostDetailImages = ({ post, checkClickTarget,currentIndex, changeImage }) => {
    return (
        <div>
            <div className={styles.pic}
                 onClick={(e) => checkClickTarget(e)}
                 style={{
                     backgroundImage: `url(${post.images[currentIndex]})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center'
                 }}>
                {post.images.length > 1 &&
                    <ControlArrow
                        changeImg={changeImage}
                    />}
                <Dots
                    length={post.images.length}
                    currentIdx={currentIndex}
                />
            </div>
        </div>
    );
};

export default PostDetailImages;