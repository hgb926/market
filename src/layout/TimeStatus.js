import React from 'react';
import styles from '../styles/layout/TimeStatus.module.scss'

const TimeStatus = () => {

    let time = new Date().getHours() + ":" + new Date().getMinutes();


    return (
        <div className={styles.container}>
            <div className={styles.time}>{time}</div>
            <div className={styles.notchWrap}>
                <div className={styles.notch}></div>
            </div>
            <div className={styles.others}>

            </div>
        </div>
    );
};

export default TimeStatus;