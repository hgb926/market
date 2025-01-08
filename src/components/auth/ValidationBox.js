import React, { useEffect, useState } from 'react';
import styles from "../../styles/pages/Register.module.scss";
import { FiCheck } from "react-icons/fi";
import { validateEmail, validatePassword, validateNickname, validateImageType, validateImageSize } from '../../utils/validation';

const ValidationBox = ({ currentStep, emailValue, checkValidate, pwValue, nickValue, imageFile, getImage }) => {
    // 이메일 검증 상태
    const [emailSuccess, setEmailSuccess] = useState(false);

    // 비밀번호 검증 상태
    const [hasNumber, setHasNumber] = useState(false);
    const [isValidPwLength, setIsValidPwLength] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    // 닉네임 검증 상태
    const [isValidNicknameLength, setIsValidNicknameLength] = useState(false);
    const [hasNotSpecialChar, setHasNotSpecialChar] = useState(false);

    // 이미지 검증 상태
    const [isValidImage, setIsValidImage] = useState(false);
    const [imageValidationMessage, setImageValidationMessage] = useState('');

    // ✅ 이메일 검증
    useEffect(() => {
        const isValid = validateEmail(emailValue);
        setEmailSuccess(isValid);
        if (typeof checkValidate === 'function') {
            checkValidate(isValid);
        }
    }, [emailValue, checkValidate]);

    // ✅ 비밀번호 검증
    useEffect(() => {
        if (pwValue) {
            const { hasNumber, isValidLength, hasSpecialChar } = validatePassword(pwValue);
            setHasNumber(hasNumber);
            setIsValidPwLength(isValidLength);
            setHasSpecialChar(hasSpecialChar);
        } else {
            setHasNumber(false);
            setIsValidPwLength(false);
            setHasSpecialChar(false);
        }
    }, [pwValue]);

    // ✅ 닉네임 검증
    useEffect(() => {
        if (nickValue) {
            const { isValidLength, hasNotSpecialChar } = validateNickname(nickValue);
            setIsValidNicknameLength(isValidLength);
            setHasNotSpecialChar(hasNotSpecialChar);
            if (isValidLength && hasNotSpecialChar) {
                checkValidate(true);
            } else {
                checkValidate(false);
            }
        } else {
            setIsValidNicknameLength(false);
            setHasNotSpecialChar(true);
        }
    }, [nickValue, checkValidate]);

    // ✅ 이미지 검증
    useEffect(() => {
        if (imageFile) {
            if (!validateImageType(imageFile)) {
                setIsValidImage(false);
                setImageValidationMessage('이미지 파일만 업로드 가능합니다.');
                checkValidate(true)
                return;
            }

            if (!validateImageSize(imageFile, 3)) {
                setIsValidImage(false);
                setImageValidationMessage('이미지 크기는 최대 3MB까지 가능합니다.');
                checkValidate(true)
                return;
            }
            checkValidate(false)
            setIsValidImage(true);
            setImageValidationMessage('');
            getImage(imageFile);
        }
    }, [imageFile, getImage]);

    return (
        <div className={styles.valContainer}>
            {/* 📧 이메일 검증 */}
            {currentStep === "email" && (
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`} />
                    <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                        이메일 형식이 올바른지 확인해주세요.
                    </p>
                </div>
            )}

            {/* 🔒 비밀번호 검증 */}
            {currentStep === "password" && (
                <>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${hasNumber ? styles.clear : ""}`} />
                        <p>1개 이상의 숫자를 사용해야 합니다.</p>
                    </div>
                </>
            )}

            {/* 📝 닉네임 검증 */}
            {currentStep === "nickname" && (
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${isValidNicknameLength ? styles.clear : ""}`} />
                    <p>글자수는 4 ~ 10자리로 사용해야 합니다.</p>
                </div>
            )}

            {/* 🖼️ 이미지 검증 */}
            {currentStep === "image" && (
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${isValidImage ? styles.clear : ""}`}/>
                    <p className={`${styles.valText} ${isValidImage ? styles.clear : ""}`}>
                        {isValidImage
                            ? '이미지가 올바르게 등록되었습니다.'
                            : imageValidationMessage || '용량 최대 3MB까지 가능합니다.'
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default ValidationBox;