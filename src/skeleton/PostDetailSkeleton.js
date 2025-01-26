import React from 'react';
import styles from '../styles/skeleton/PostDetailSkeleton.module.scss';

const PostDetailSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.pic}></div>
            <div className={styles.subContainer}>
                <div className={styles.sellerWrap}>
                    <div className={styles.userImage}></div>
                    <div className={styles.sellerInfo}>
                        <div className={styles.sellerName}></div>
                        <div className={styles.location}></div>
                    </div>
                </div>
                <div className={styles.descriptWrap}>
                    <div className={styles.title}></div>
                    <div className={styles.meta}></div>
                    <div className={styles.content}></div>
                    <div className={styles.wantLocation}></div>
                    <div className={styles.map}></div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <div className={styles.bottomMain}>
                    <div className={styles.heart}></div>
                    <div className={styles.descript}>
                        <div className={styles.price}></div>
                        <div className={styles.flag}></div>
                    </div>
                    <div className={styles.chat}></div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(PostDetailSkeleton);