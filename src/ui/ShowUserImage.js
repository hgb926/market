import React from 'react';
import styles from '../styles/components/ImageSlider.module.scss'
import ReactDOM from "react-dom";
import TimeStatus from "../layout/TimeStatus";
import XButton from "./XButton";

const ShowUserImage = ({ image, changeShowUserImage }) => {

    console.log(image)
    return ReactDOM.createPortal(
        <div className={styles.container}>
            <TimeStatus />
            <XButton
                changeShowUserImage={changeShowUserImage}
                from={'showUserImage'}
                ui={'x'}
            />
            <div
                className={styles.imageContainer}
                onClick={() => changeShowUserImage(false)}
            >
                <div
                    className={styles.image}
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                    onClick={() => changeShowUserImage(false)}
                ></div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default ShowUserImage;