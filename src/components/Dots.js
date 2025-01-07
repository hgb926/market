import React from 'react';
import styles from '../styles/components/Dots.module.scss'

const Dots = ({ length, currentIdx }) => {

    return (
        <div className={styles.dotsContainer}>
            {Array.from(new Array(length)).map((_, index) => (
                <span
                    key={index}
                    className={`${currentIdx === index ? styles.active : styles.dots}`}
                    // className={`${styles.menu} ${currentPage === 'info' ? styles.active : undefined}`}
                />
            ))}
        </div>
    );
};

export default Dots;