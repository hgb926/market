import React, { useEffect, useState } from 'react';
import styles from "../../styles/pages/Register.module.scss";
import { FiCheck } from "react-icons/fi";
import nickname from "./Nickname";

const ValidationBox = ({ currentStep,
                           emailValue,
                           checkValidate,
                           pwValue,
                           nickValue
                       }) => {
    // 이메일 검증 상태
    const [emailSuccess, setEmailSuccess] = useState(false);

    // 비밀번호 검증 상태
    const [hasNumber, setHasNumber] = useState(false);       // 숫자 포함 여부
    const [isValidPwLength, setIsValidPwLength] = useState(false); // 길이 검증
    const [hasSpecialChar, setHasSpecialChar] = useState(false); // 특수문자 포함 여부

    // 닉네임 검증 상태
    const [isValidNicknameLength, setIsValidNicknameLength] = useState()
    const [hasNotSpecialChar, setHasNotSpecialChar] = useState(false)


    //  이메일 검증
    useEffect(() => {
        if (emailValue && emailValue.includes("@") && emailValue.includes('.') && emailValue.slice(-3) === "com") {
            setEmailSuccess(true);
            if (typeof checkValidate === 'function') {
                checkValidate(true);
            }
        } else {
            setEmailSuccess(false);
            if (typeof checkValidate === 'function') {
                checkValidate(false);
            }
        }
    }, [emailValue, checkValidate]);


    // ✅ 비밀번호 검증
    useEffect(() => {
        if (pwValue) {
            setHasNumber(/\d/.test(pwValue)); // 숫자 포함 여부 확인
            setIsValidPwLength(pwValue.length >= 8); // 길이 확인
            setHasSpecialChar(/[!@#$%^&*?_~]/.test(pwValue)); // 특수문자 확인
        } else {
            setHasNumber(false);
            setIsValidPwLength(false);
            setHasSpecialChar(false);
        }
    }, [pwValue]);

    // 닉네임 검증
    useEffect(() => {
        if (nickValue) {
            setIsValidNicknameLength(nickValue.length >= 4 && nickValue.length <= 10); // 4~10자리 확인
            setHasNotSpecialChar(/^[a-zA-Z0-9]+$/.test(nickValue)); // 특수문자 미포함 확인
        } else {
            setIsValidNicknameLength(false);
            setHasNotSpecialChar(true);
        }
    }, [nickValue]);

    return (
        <div className={styles.valContainer}>

            {/* 이메일 검증 */}
            {currentStep === "email" && (
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`} />
                    <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                        이메일 형식이 올바른지 확인해주세요.
                    </p>
                </div>
            )}

            {/* 비밀번호 검증 */}
            {currentStep === "password" && (
                <>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${hasNumber ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${hasNumber ? styles.clear : ""}`}>
                            1개 이상의 숫자를 사용해야 합니다.
                        </p>
                    </div>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${isValidPwLength ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${isValidPwLength ? styles.clear : ""}`}>
                            8자리 이상으로 사용해야 합니다.
                        </p>
                    </div>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${hasSpecialChar ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${hasSpecialChar ? styles.clear : ""}`}>
                            1개 이상의 특수문자 (!,@,#,%,^,&,*,?,_,~)<br />를 사용해야 합니다.
                        </p>
                    </div>
                </>
            )}

            {currentStep === "nickname" && (
                <>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${hasNotSpecialChar ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${hasNotSpecialChar ? styles.clear : ""}`}>
                            특수문자 (!,@,#,%,^,&,*,?,_,~)는 입력할 수 없습니다.
                        </p>
                    </div>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${isValidNicknameLength ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${isValidNicknameLength ? styles.clear : ""}`}>
                            글자수는 4 ~ 10자리로 사용해야 합니다.
                        </p>
                    </div>
                </>
            )}

        </div>
    );
};

export default ValidationBox;