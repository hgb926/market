import React, {useEffect, useState} from 'react';
import styles from '../styles/layout/TimeStatus.module.scss';
import {BsBarChartFill} from 'react-icons/bs';
import {TiWiFi} from 'react-icons/ti';
import {CgBatteryFull} from 'react-icons/cg';

const TimeStatus = () => {
    const [time, setTime] = useState('');

    // 시간 업데이트
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
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
                    <TiWiFi className={styles.wifi}/>
                    <CgBatteryFull className={styles.battery}/>
                </div>
            </div>
        </div>
    );
};

export default TimeStatus;