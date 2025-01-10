import React from 'react';
import styles from '../styles/components/HomeNavigationSkeleton.module.scss';

const HomeNavigationSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.town}>
                <div className={styles.text} />
            </div>
            <div className={styles.menus}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={styles.icon} />
                ))}
            </div>
        </div>
    );
};

export default HomeNavigationSkeleton;