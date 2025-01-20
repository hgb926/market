import React from 'react';
import styles from '../styles/pages/PostSearchPage.module.scss'
import {uiActions} from "../components/store/ui/UiSlice";
import {useDispatch} from "react-redux";
import SearchHeader from "../components/search/SearchHeader";
import RecommendSection from "../components/search/RecommendSection";
import SearchedKeywords from "../components/search/SearchedKeywords";

const SearchPostPage = () => {

    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))


    return (
        <div className={styles.container}>
            <SearchHeader/>
            <RecommendSection/>
            <SearchedKeywords/>
        </div>
    );
};

export default SearchPostPage;