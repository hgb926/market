import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../../styles/components/XButton.module.scss'
import {IoIosArrowRoundBack} from "react-icons/io";
import {LiaTimesSolid} from "react-icons/lia";
import {MdArrowBackIos} from "react-icons/md";

const XButton = ({changeShowImage, changeShowUserImage, from, ui}) => {

    const navi = useNavigate();


    const backHandler = () => {
        switch (from) {
            case "imageSlider":
                changeShowImage(false)
                break;
            case "showUserImage" :
                changeShowUserImage(false)
                break;
            case 'auth' :
                navi(-1)
                break
            case 'setting':
                navi(-1)
                break;
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
        case '<':
            button = <MdArrowBackIos style={{ fontSize:'1.5rem' }}/>
            break;
        default :
        button = <MdArrowBackIos />
    }

    return (
        <div onClick={backHandler} className={styles.cancel}>
            {button}
        </div>
    );
};

export default XButton;