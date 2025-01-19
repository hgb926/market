import React from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";
import {SlArrowLeft} from "react-icons/sl";
import {useSelector} from "react-redux";
import {sliceTownName} from "../../utils/sliceAddress";
import {useNavigate} from "react-router-dom";

const SearchHeader = () => {

    let userData = useSelector(state => state.userInfo.userData);
    const townName = sliceTownName(userData.address)
    const navi = useNavigate();

    return (
        <div className={styles.searchContainer}>
            <SlArrowLeft className={styles.icon} onClick={() => navi(-1)}/>
            <input className={styles.searchInput} placeholder={`${townName} 근처에서 검색`}/>
            <span className={styles.close}>닫기</span>
        </div>
    );
};

export default SearchHeader;