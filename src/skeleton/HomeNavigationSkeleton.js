import React from 'react';
import styles from '../styles/skeleton/HomeNavigationSkeleton.module.scss';

const HomeNavigationSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.town}>
                <div className={styles.text} />
            </div>
            <div className={styles.menus}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className={styles.icon} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(HomeNavigationSkeleton);