import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {SlArrowLeft} from "react-icons/sl";
import {useSelector} from "react-redux";
import {sliceTownName} from "../../utils/sliceAddress";
import {useNavigate} from "react-router-dom";
import {LiaTimesSolid} from "react-icons/lia";

const SearchHeader = ({ keyword }) => {

    const [word, setWord] = useState('');
    const userData = useSelector(state => state.userInfo?.userData);
    const townName = userData?.address ? sliceTownName(userData.address) : '';
    const navi = useNavigate();
    const inputRef = useRef(null);

    const enterHandler = (e) => {
        if (e.key === 'Enter' && word.trim()) {
            navi(`/search/${word}`)
        }
    }

    return (
        <div className={styles.searchContainer} onKeyUp={(e) => enterHandler(e)}>
            <SlArrowLeft className={styles.icon} onClick={() => navi(-1)} />
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
            <span className={styles.close} onClick={() => navi(`/search/${word}`)}>검색</span>
        </div>
    );
};

export default SearchHeader;