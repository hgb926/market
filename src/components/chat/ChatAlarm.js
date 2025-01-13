import React, {useEffect} from 'react';
import styles from '../../styles/components/ChatAlarm.module.scss'
import {useSelector} from "react-redux";

const ChatAlarm = ({loginFlag}) => {
    let userData = useSelector(state => state.userInfo.userData);

    useEffect(() => {
        console.log(userData); // userData 확인
    }, [userData]);

    return (
        <div className={styles.container}>
            <div className={styles.msgWrap}>
                <div
                    className={styles.image}
                    style={{
                        // backgroundImage: `url(${userData.profileUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                    }}
                ></div>
                <div className={styles.wrap}>
                    <p className={styles.name}>릴보이</p>
                    <p className={styles.text}>깎아주세요</p>
                </div>
            {/*  제목 7글자 이상이면 ... 처리  */}
            <div className={styles.postTitle}>크레아틴 팝니다</div>
            </div>
        </div>
    );
};

export default ChatAlarm;