import React from 'react';
import styles from '../../styles/components/ControlArrow.module.scss';
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";

const ControlArrow = ({changeImg}) => {
    return (
        <div className={styles.control}>
            <SlArrowLeft onClick={() => changeImg('prev')}/>
            <SlArrowRight onClick={() => changeImg('next')}/>
        </div>
    );
};

export default ControlArrow;