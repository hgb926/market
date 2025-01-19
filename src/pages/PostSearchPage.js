import React from 'react';
import styles from '../styles/pages/PostSearchPage.module.scss'
import {uiActions} from "../components/store/ui/UiSlice";
import {useDispatch, useSelector} from "react-redux";
import SearchHeader from "../components/search/SearchHeader";

const PostSearchPage = () => {

    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))
    let userData = useSelector(state => state.userInfo.userData);


    return (
        <div className={styles.container}>
            <SearchHeader/>
        </div>
    );
};

export default PostSearchPage;