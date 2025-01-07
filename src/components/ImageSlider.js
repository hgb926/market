import React, { useRef, useState } from 'react';
import styles from '../styles/components/ImageSlider.module.scss';
import ReactDOM from 'react-dom';
import TimeStatus from '../layout/TimeStatus';
import XButton from './XButton';
import ControlArrow from './ControlArrow';
import Dots from "./Dots";

const ImageSlider = ({ images, changeShowImage }) => {
    const imageRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

    // 이미지 변경 함수
    const changeImage = (type) => {
        if (type === 'prev') {
            setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
        } else if (type === 'next') {
            setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }
    };

    const cancelHandler = (e) => {
        if (e.target.tagName === 'svg') return;
        else changeShowImage(false)
    }

    return ReactDOM.createPortal(
        <div className={styles.container}>
            <TimeStatus />
            <XButton
                changeShowImage={changeShowImage}
                from={'imageSlider'}
                ui={'x'}
            />
            <div
                className={styles.imageContainer}
                onClick={(e) => cancelHandler(e)}
            >
                <div
                    className={styles.image}
                    ref={imageRef}
                    style={{
                        backgroundImage: `url(${images[currentIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
            </div>
            <ControlArrow
                changeImg={changeImage}
            />
            <Dots
                length={images.length}
                currentIdx={currentIndex}
            />
        </div>,
        document.getElementById('modal-root')
    );
};

export default ImageSlider;