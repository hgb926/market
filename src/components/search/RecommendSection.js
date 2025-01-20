import React from 'react';
import styles from "../../styles/pages/PostSearchPage.module.scss";

const RecommendSection = () => {
    return (
        <div className={styles.recommendContainer}>
            <p className={styles.title}>추천 검색</p>
            <div className={styles.recommendKeywordContainer}>
                <div className={styles.recommendKeyword}>책상의자</div>
                <div className={styles.recommendKeyword}>사무용의자</div>
                <div className={styles.recommendKeyword}>컴퓨터의자</div>
                <div className={styles.recommendKeyword}>애견계단</div>
                <div className={styles.recommendKeyword}>애견카시트</div>
                <div className={styles.recommendKeyword}>강아지 카시트</div>
                <div className={styles.recommendKeyword}>아이패드 13</div>
            </div>
        </div>
    );
};

export default RecommendSection;