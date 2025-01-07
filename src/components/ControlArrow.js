import React from 'react';
import styles from '../styles/components/ControlArrow.module.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const ControlArrow = ({ changeImg }) => {
    return (
        <div className={styles.control}>
            <MdKeyboardArrowLeft onClick={() => changeImg('prev')} />
            <MdKeyboardArrowRight onClick={() => changeImg('next')} />
        </div>
    );
};

export default ControlArrow;