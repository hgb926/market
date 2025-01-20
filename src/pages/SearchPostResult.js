import React from 'react';
import styles from '../styles/pages/PostSearchPage.module.scss'
import SearchHeader from "../components/search/SearchHeader";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";


const SearchPostResult = () => {

    const {keyword} = useParams()
    console.log(keyword)
    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))


    return (
        <div className={styles.container}>
            <SearchHeader keyword={keyword}/>
        </div>
    );
};

export default SearchPostResult;