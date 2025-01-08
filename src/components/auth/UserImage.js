import React, { useRef, useState } from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import ValidationBox from "./ValidationBox";

const UserImage = ({ getImage, currentStatus, setImageValidation }) => {
    const [userImage, setUserImage] = useState(''); // 사용자 이미지 상태
    const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일
    const imageRef = useRef();

    const defaultImg = 'https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg';

    // 이미지 선택 핸들러
    const fileHandler = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (!file) return;

        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl)
        getImage(imageUrl)
        setUserImage(imageUrl);

        currentStatus(true); // 이미지 선택됨
    };

    // 파일 선택 트리거
    const triggerFileSelect = () => {
        imageRef.current.click();
    };

    return (
        <>
            <MainTitle title={'프로필 사진을 등록해주세요.'} subText={'(생략 가능)'}/>
            <div className={styles.subContainer}>
                <div className={styles.imageWrap} onClick={triggerFileSelect}>
                    <img
                        alt={'프로필'}
                        className={styles.userImage}
                        src={userImage || defaultImg}
                    />
                    <input
                        type="file"
                        ref={imageRef}
                        style={{ display: 'none' }}
                        onChange={fileHandler}
                        accept="image/*"
                    />
                </div>
                <ValidationBox
                    currentStep={'image'}
                    imageFile={selectedFile}
                    checkValidate={setImageValidation}
                />
            </div>
        </>
    );
};

export default UserImage;