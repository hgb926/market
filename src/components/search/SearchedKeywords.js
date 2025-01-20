import React, {useState} from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {FiClock} from "react-icons/fi";
import {LiaTimesSolid} from "react-icons/lia";

const SearchedKeywords = () => {

    const [searchedList, setSearchedList] = useState([
        {
            id: 1,
            keyword: '의자'
        },
        {
            id: 2,
            keyword: '강아지 계단'
        },
        {
            id: 3,
            keyword: '아이패드1'
        },
    ])

    const removeKeywordHandler = (id) => {
        setSearchedList((prev) => prev.filter(search => search.id !== id));
    };


    return (
        <div className={styles.recentlyContainer}>
            <div className={styles.recentlyTopWrap}>
                <p className={styles.title}>최근 검색</p>
                <p className={styles.allDelete}>전체 삭제</p>
            </div>
            <div className={styles.keywordContainer}>
                {searchedList.length && searchedList.map((searched) =>
                    <div className={styles.keywordBox} key={searched.id}>
                        <FiClock className={styles.clock}/>
                        <div className={styles.keyword}>{searched.keyword}</div>
                        <LiaTimesSolid
                            className={styles.xBtn}
                            onClick={() => removeKeywordHandler(searched.id)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchedKeywords;