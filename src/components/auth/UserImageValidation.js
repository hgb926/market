import React, { useEffect, useState } from 'react';
import styles from "../../styles/pages/Register.module.scss";
import { FiCheck } from "react-icons/fi";
import { validateImageSize, validateImageType } from "../../utils/validation";

const UserImageValidation = ({ imageFile, checkValidate }) => {
    // 이미지 검증 상태
    const [isValidImage, setIsValidImage] = useState(false);
    const [imageValidationMessage, setImageValidationMessage] = useState('이미지 크기는 최대 3MB까지 가능합니다.');

    useEffect(() => {
        if (imageFile) {
            // 이미지 파일 유형 검증
            if (!validateImageType(imageFile)) {
                setIsValidImage(false);
                setImageValidationMessage('이미지 파일만 업로드 가능합니다.');
                checkValidate(false); // 검증 실패
                return;
            }

            // 이미지 크기 검증
            if (!validateImageSize(imageFile, 3)) {
                setIsValidImage(false);
                setImageValidationMessage('이미지 크기는 최대 3MB까지 가능합니다.');
                checkValidate(false); // 검증 실패
                return;
            }

            // 검증 성공
            setIsValidImage(true);
            setImageValidationMessage('이미지가 올바르게 등록되었습니다.');
            checkValidate(true); // 검증 성공
        }
    }, [imageFile, checkValidate]);

    return (
        <div className={styles.valContainer}>
            <div className={styles.valBox}>
                <FiCheck className={`${styles.check} ${isValidImage ? styles.clear : ""}`} />
                <p className={`${styles.valText} ${isValidImage ? styles.clear : ""}`}>
                    {imageValidationMessage}
                </p>
            </div>
        </div>
    );
};

export default UserImageValidation;