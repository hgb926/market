import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {SlArrowLeft} from "react-icons/sl";
import {useSelector} from "react-redux";
import {sliceTownName} from "../../utils/sliceAddress";
import {useNavigate} from "react-router-dom";
import {LiaTimesSolid} from "react-icons/lia";
import {SEARCH_URL} from "../../config/host-config";

const SearchHeader = ({ keyword }) => {

    const [word, setWord] = useState('');
    const userData = useSelector(state => state.userInfo?.userData);
    const userId = localStorage.getItem('id');
    const townName = userData?.address ? sliceTownName(userData.address) : '';
    const navi = useNavigate();
    const inputRef = useRef(null);

    const enterHandler = async (e) => {
        if (e.key === 'Enter' && word.trim()) {
            await searchHandler()
        }
    }

    const searchHandler = async () => {
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
        <div className={styles.searchContainer} onKeyUp={(e) => enterHandler(e)}>
            <SlArrowLeft className={styles.icon} onClick={() => navi('/search')} />
            <input
                className={`${styles.searchInput} ${keyword ? styles.haveKeyword : ""}`}
                placeholder={`${keyword ? keyword : `${townName} 근처에서 검색`}`}
                ref={inputRef}
                onChange={(e) => setWord(e.target.value)}
            />
            {word.length ? (
                <LiaTimesSolid
                    className={styles.clearBtn}
                    onClick={() => {
                        inputRef.current.value = '';
                        setWord('');
                    }}
                />
            ) : null}
            <span className={styles.close} onClick={searchHandler}>검색</span>
        </div>
    );
};

export default SearchHeader;