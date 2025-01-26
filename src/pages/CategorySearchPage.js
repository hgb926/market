import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {POST_URL} from "../config/host-config";
import Spinner from "../skeleton/Spinner";
import Post from "../components/post/Post";
import styles from '../styles/pages/Settings.module.scss'
import MyPageHeader from "../components/auth/MyPageHeader";

const CategorySearchPage = () => {

    const {keyword: category} = useParams();
    const [loading, setLoading] = useState(true)
    const [categoryResult, setCategoryResult] = useState([])

    useEffect(() => {
        (async () => {
            setLoading(true)
            let response = await fetch(`${POST_URL}/${category}`);
            if (response.status === 200) {
                let responseData = await response.json();
                setCategoryResult(responseData)
                setLoading(false)
                console.log(responseData)
            } else {
                let responseData = await response.json();
                console.log(responseData)
            }
        })()
    }, []);


    if (loading) return <Spinner/>

    return (

        <div className={styles.container}>
            <MyPageHeader title={`${category}`}/>
            <div className={styles.postContainer}>
                {categoryResult.map((post) => (
                    <Post post={post}/>
                ))}
            </div>
        </div>
    );
};

export default CategorySearchPage;

