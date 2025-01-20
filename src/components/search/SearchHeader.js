import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {SlArrowLeft} from "react-icons/sl";
import {useSelector} from "react-redux";
import {sliceTownName} from "../../utils/sliceAddress";
import {useNavigate} from "react-router-dom";
import {LiaTimesSolid} from "react-icons/lia";

const SearchHeader = () => {
    const [keyword, setKeyword] = useState('');
    const userData = useSelector(state => state.userInfo?.userData);
    const townName = userData?.address ? sliceTownName(userData.address) : '';
    const navi = useNavigate();
    const inputRef = useRef(null);

    return (
        <div className={styles.searchContainer}>
            <SlArrowLeft className={styles.icon} onClick={() => navi(-1)} />
            <input
                className={styles.searchInput}
                placeholder={`${townName} 근처에서 검색`}
                ref={inputRef}
                onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword.length ? (
                <LiaTimesSolid
                    className={styles.clearBtn}
                    onClick={() => {
                        inputRef.current.value = '';
                        setKeyword('');
                    }}
                />
            ) : null}
            <span className={styles.close}>검색</span>
        </div>
    );
};

export default SearchHeader;