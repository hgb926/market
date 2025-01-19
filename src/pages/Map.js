import React from 'react';
import styles from '../styles/pages/Map.module.scss'
import KakaoMap from "../components/map/KakaoMap";

const MapPage = () => {


    return (
        <div className={styles.container}>
            <KakaoMap/>
        </div>
    );
};

export default MapPage;