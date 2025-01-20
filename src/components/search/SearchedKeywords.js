import React, {useEffect, useState} from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {FiClock} from "react-icons/fi";
import {LiaTimesSolid} from "react-icons/lia";
import {SEARCH_URL} from "../../config/host-config";

const SearchedKeywords = () => {

    const [searchedList, setSearchedList] = useState([])
    const id = localStorage.getItem('id');
    useEffect(() => {

        (async () => {
            const response = await fetch(`${SEARCH_URL}/${id}`);
            const jsonData = await response.json();
            setSearchedList(jsonData)
        })()

    }, []);

    const removeKeywordHandler = (id) => {
        setSearchedList((prev) => prev.filter(search => search.id !== id));
    };


    return (
        <div className={styles.recentlyContainer}>
            <div className={styles.recentlyTopWrap}>
                <p className={styles.title}>최근 검색</p>
                <p
                    className={styles.allDelete}
                    onClick={() => setSearchedList({})}
                >
                    전체 삭제
                </p>
            </div>
            <div className={styles.keywordContainer}>
                {searchedList.length ? searchedList.map((searched) =>
                    <div className={styles.keywordBox} key={searched.id}>
                        <FiClock className={styles.clock}/>
                        <div className={styles.keyword}>{searched.keyword}</div>
                        <LiaTimesSolid
                            className={styles.xBtn}
                            onClick={() => removeKeywordHandler(searched.id)}
                        />
                    </div>
                ) : <div className={styles.noContent}>검색 기록이 없습니다.</div>}
            </div>
        </div>
    );
};

export default SearchedKeywords;