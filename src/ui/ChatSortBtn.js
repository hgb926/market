import React, {useState} from 'react';
import styles from '../styles/components/ChatSortBtn.module.scss'
import {CHAT_URL} from "../config/host-config";

const ChatSortBtn = ({ setFetchUrl }) => {

    const [currentMenu, setCurrentMenu] = useState('전체')

    const sortHandler = async (type) => {
        setCurrentMenu(type)
        let fetchUrl = CHAT_URL;
        switch (type) {
            case '전체':
                setFetchUrl(fetchUrl + '/list')
                break;
            case '판매':
                setFetchUrl(fetchUrl + '/sell-list')
                break;
            case '구매':
                setFetchUrl(fetchUrl + '/buy-list')
                break;
        }
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.sortBtn} ${currentMenu === "전체" && styles.active}`}
                onClick={() => sortHandler('전체')}
            >
                전체
            </div>
            <div
                className={`${styles.sortBtn} ${currentMenu === "판매" && styles.active}`}
                onClick={() => sortHandler('판매')}
            >
                판매
            </div>
            <div
                className={`${styles.sortBtn} ${currentMenu === "구매" && styles.active}`}
                onClick={() => sortHandler('구매')}
            >
                구매
            </div>
        </div>
    );
};

export default ChatSortBtn;