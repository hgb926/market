import React from 'react';
import {useNavigate} from "react-router-dom";
import {MdOutlineCancel} from "react-icons/md";
import styles from '../styles/components/XButton.module.scss'
import {IoIosArrowRoundBack} from "react-icons/io";
import {LiaTimesSolid} from "react-icons/lia";

const XButton = ({changeShowImage, from, ui}) => {

    const navi = useNavigate();
    const backHandler = () => {
        if (from === 'imageSlider') {
            changeShowImage(false)
        } else if (from === 'auth') {
            navi(-1)
        }
    }

    let button;
    switch (ui) {
        case "x":
            button = <LiaTimesSolid />;
            break;
        case "<-":
            button = <IoIosArrowRoundBack style={{ fontSize:"2.5rem"}}/>
            break;
        default :
        button = 'x'
    }

    return (
        <div onClick={backHandler} className={styles.cancel}>
            {button}
        </div>
    );
};

export default XButton;