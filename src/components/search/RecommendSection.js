import React from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {SEARCH_URL} from "../../config/host-config";
import {useNavigate} from "react-router-dom";

const RecommendSection = () => {

    const userId = localStorage.getItem('id');
    const navi = useNavigate();

    const DUMMY_WORDS = [
        { key: 1, word: '책상의자' },
        { key: 2, word: '사무용의자' },
        { key: 3, word: '컴퓨터의자' },
        { key: 4, word: '애견계단' },
        { key: 5, word: '애견카시트' },
        { key: 6, word: '강아지 카시트' },
        { key: 7, word: '아이패드13' },
        { key: 8, word: '맥북m1' }
    ];

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
        <div className={styles.recommendContainer}>
            <p className={styles.title}>추천 검색</p>
            <div className={styles.recommendKeywordContainer}>
                {DUMMY_WORDS.map((word) =>
                    (<div
                        className={styles.recommendKeyword}
                        key={word.key}
                        onClick={() => searchHandler(word.word)}
                    >
                        {word.word}
                    </div>))
                }
            </div>
        </div>
    );
};

export default RecommendSection;