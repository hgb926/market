import React, {useEffect} from 'react';
import styles from '../../styles/components/ChatAlarm.module.scss'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const ChatAlarm = ({loginFlag, message, setShowAlarm}) => {
    let userData = useSelector(state => state.userInfo.userData);

    const hideAlarm = () => setShowAlarm(false)

    useEffect(() => {
        console.log(userData); // userData 확인
        setTimeout(() => {
            hideAlarm()
        }, 4000)
    }, [userData]);

    // {
    //     "_id": "6784e883f13c1364773f9249",
    //     "room": "6784b546d0956b72c15bb711",
    //     "text": "gd",
    //     "writer": "6780c132f6b6ce277c05b8d1",
    //     "date": "2025-01-13T10:18:43.650Z",
    //     "taker": "6780f844841d0ca5d67b95b2",
    //     "nickname": "스윙스",
    //     "postTitle": "바이레도 로즈오브노맨즈 팝니다",
    //     "profileUrl": "https://node-forum1217.s3.ap-northeast-2.amazonaws.com/profile-images/1736491314126_áá¡áá®á«áá©áá³.jpeg"
    // }

    return (
        <Link
            className={styles.container}
            to={`/chat/${message.room}`}
        >
            <div className={styles.msgWrap}>
                <div
                    className={styles.image}
                    style={{
                        backgroundImage: `url(${message.profileUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                    }}
                ></div>
                <div className={styles.wrap}>
                    <p className={styles.name}>{message.nickname}</p>
                    <p className={styles.text}>{message.text}</p>
                </div>
            {/*  제목 7글자 이상이면 ... 처리  */}
            <div className={styles.postTitle}>{message.postTitle}</div>
            </div>
        </Link>
    );
};

export default ChatAlarm;