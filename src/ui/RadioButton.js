import React, { useState } from 'react';
import styles from '../styles/ui/RadioButton.module.scss';

const RadioButton = () => {
    const [isActive, setIsActive] = useState(false);

    const changeHandler = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <div
            className={`${styles.container} ${isActive ? styles.active : ''}`} // 상태에 따른 클래스 추가
            onClick={changeHandler}
        >
            <div className={`${styles.circle} ${isActive ? styles.active : ''}`} />
        </div>
    );
};

export default RadioButton;