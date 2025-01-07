import React, {useRef} from 'react';
import styles from '../styles/components/ImageSlider.module.scss'
import ReactDOM from "react-dom";
import TimeStatus from "../layout/TimeStatus";
import XButton from "./XButton";

const ImageSlider = ({ images, changeShowImage }) => {
    const imageRef = useRef();

    console.log(images)

    return ReactDOM.createPortal(
        <div className={styles.container}>
            <TimeStatus/>
            <XButton
                changeShowImage={changeShowImage}
                type={'cancel'}
            />
            <div className={styles.imageContainer}>
                <div
                    className={styles.image}
                    ref={imageRef}
                    style={{
                        backgroundImage: `url(${images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
            </div>
        </div>,
    document.getElementById('modal-root')
    );
};

export default ImageSlider;