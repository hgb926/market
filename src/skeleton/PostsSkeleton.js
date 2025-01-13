import React from 'react';
import styles from '../styles/skeleton/PostsSkeleton.module.scss';

const PostsSkeleton = () => {
    const skeletonItems = Array.from({ length: 5 }); // 스켈레톤 아이템 개수 설정

    return (
        <div className={styles.container}>
            {skeletonItems.map((_, idx) => (
                <div key={idx} className={styles.post}>
                    <div className={styles.image} />
                    <div className={styles.details}>
                        <div className={styles.title} />
                        <div className={styles.meta} />
                        <div className={styles.price} />
                    </div>
                    <div className={styles.icons}>
                        <div className={styles.icon} />
                        <div className={styles.icon} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostsSkeleton;