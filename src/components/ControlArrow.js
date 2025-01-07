import React from 'react';
import styles from '../styles/components/ControlArrow.module.scss'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";

const ControlArrow = ({ images }) => {



    return (
        <div className={styles.control}>
            <MdKeyboardArrowLeft />
            <MdKeyboardArrowRight />
        </div>
    );
};

export default ControlArrow;