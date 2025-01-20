import React, {useEffect, useState} from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {FiClock} from "react-icons/fi";
import {LiaTimesSolid} from "react-icons/lia";
import {SEARCH_URL} from "../../config/host-config";
import {useNavigate} from "react-router-dom";

const SearchedKeywords = () => {

    const [searchedList, setSearchedList] = useState([])
    const userId = localStorage.getItem('id');
    const navi = useNavigate();
    useEffect(() => {
        // 검색 기록 가져오는 함수
        (async () => {
            const response = await fetch(`${SEARCH_URL}/${userId}`);
            const jsonData = await response.json();
            setSearchedList(jsonData)
        })()

    }, []);

    const removeKeywordHandler = (id) => {
        setSearchedList((prev) => prev.filter(search => search.id !== id));
    };

    const searchHandler = async (word) => {
        try {
            await fetch(`${SEARCH_URL}`, {
                method: 'POST',
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    word,
                    userId,
                })
            })
        } catch (e) {
            console.error(e)
        }
        navi(`/search/${word}`)
    }


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
                        <div
                            className={styles.keyword}
                            onClick={() => searchHandler(searched.keyword)}
                        >
                            {searched.keyword}
                        </div>
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