import React, { useRef, useState, useEffect } from 'react';
import styles from "../styles/pages/WriteForm.module.scss";
import { AiFillCamera } from "react-icons/ai";

const ImageUpload = ({ getImages }) => {
    const [images, setImages] = useState([]); // 이미지 목록
    const fileInputRef = useRef();

    // 이미지 박스 클릭 핸들러
    const imageBoxClickHandler = () => {
        fileInputRef.current?.click();
    };

    // 이미지 업로드 핸들러
    const fileHandler = (e) => {
        const files = Array.from(e.target.files || []);

        if (images.length + files.length > 10) {
            alert('최대 10개의 이미지만 등록할 수 있습니다.');
            return;
        }

        const newImages = files.map((file) => {
            return {
                id: Date.now() + Math.random(),
                url: URL.createObjectURL(file),
            };
        });

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    // images 상태 변경 시 getImages 호출
    useEffect(() => {
        const imageUrls = images.map((img) => img.url); // 이미지의 URL만 추출
        getImages(imageUrls); // URL 배열을 getImages에 전달
    }, [images]); // 의존성 배열에서 images만 포함

    return (
        <>
            {/* 이미지 업로드 */}
            <div className={styles.imageUpload}>
                {images.map((img) => (
                    <div
                        key={img.id}
                        className={styles.imageBox}
                        style={{ backgroundImage: `url(${img.url})` }}
                    ></div>
                ))}
                {images.length < 10 && (
                    <div className={styles.imageBox} onClick={imageBoxClickHandler}>
                        <AiFillCamera className={styles.camera} />
                        <span>{images.length}/10</span>
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={fileHandler}
                accept="image/*"
                multiple
            />
        </>
    );
};

export default ImageUpload;