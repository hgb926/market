import React, { useRef, useState } from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import UserImageValidation from "./UserImageValidation";

const UserImage = ({ getImage, currentStatus, setImageValidation }) => {
    const [userImage, setUserImage] = useState(''); // 사용자 이미지 상태
    const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일
    const imageRef = useRef();

    const defaultImg = 'https://node-forum1217.s3.ap-northeast-2.amazonaws.com/uploads/1736486966914_1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg';

    // 이미지 선택 핸들러
    const fileHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        getImage(file); // 이미지 파일 객체 전달
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
                <UserImageValidation
                    imageFile={selectedFile}
                    checkValidate={setImageValidation}
                />
            </div>
        </>
    );
};

export default UserImage;