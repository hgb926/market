import React, {useState} from 'react';
import styles from '../styles/components/ChatSortBtn.module.scss'

const ChatSortBtn = () => {

    const [currentMenu, setCurrentMenu] = useState('전체')

    return (
        <div className={styles.container}>
            <div
                className={`${styles.sortBtn} ${currentMenu === "전체" && styles.active}`}
                onClick={() => setCurrentMenu('전체')}
            >
                전체
            </div>
            <div
                className={`${styles.sortBtn} ${currentMenu === "판매" && styles.active}`}
                onClick={() => setCurrentMenu('판매')}
            >
                판매
            </div>
            <div
                className={`${styles.sortBtn} ${currentMenu === "구매" && styles.active}`}
                onClick={() => setCurrentMenu('구매')}
            >
                구매
            </div>
        </div>
    );
};

export default ChatSortBtn;