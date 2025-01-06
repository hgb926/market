import React, {useEffect, useState} from 'react';
import styles from '../styles/layout/TimeStatus.module.scss';
import {BsBarChartFill} from 'react-icons/bs';
import {CgBatteryFull} from 'react-icons/cg';
import {FaWifi} from "react-icons/fa";

const TimeStatus = () => {
    const [time, setTime] = useState('');

    // 시간 업데이트
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours().toString();
            if (hours > 12) hours = hours - 12
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}`);
        };

        updateTime();
        const timer = setInterval(updateTime, 1000); // 매 초마다 업데이트

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.container}>
            {/* 시간 */}
            <div className={styles.time}>{time}</div>

            {/* 노치 */}
            <div className={styles.notchWrap}>
                <div className={styles.notch}></div>
            </div>

            {/* 기타 아이콘 */}
            <div className={styles.others}>
                <div className={styles.iconWrap}>
                    <BsBarChartFill className={styles.signal}/>
                    <FaWifi className={styles.wifi}/>
                    <CgBatteryFull className={styles.battery}/>
                </div>
            </div>
        </div>
    );
};

export default TimeStatus;