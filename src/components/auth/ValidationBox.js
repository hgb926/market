import React, { useEffect, useState } from 'react';
import styles from "../../styles/pages/Register.module.scss";
import { FiCheck } from "react-icons/fi";

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
    const [isValidLength, setIsValidLength] = useState(false); // 길이 검증
    const [hasSpecialChar, setHasSpecialChar] = useState(false); // 특수문자 포함 여부

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
            setIsValidLength(pwValue.length >= 8); // 길이 확인
            setHasSpecialChar(/[!@#$%^&*?_~]/.test(pwValue)); // 특수문자 확인
        } else {
            setHasNumber(false);
            setIsValidLength(false);
            setHasSpecialChar(false);
        }
    }, [pwValue]);

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
                        <FiCheck className={`${styles.check} ${isValidLength ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${isValidLength ? styles.clear : ""}`}>
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
                        <FiCheck className={`${styles.check} ${hasNumber ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${hasNumber ? styles.clear : ""}`}>
                            글자수는 4 ~ 10자리로 사용해야 합니다.
                        </p>
                    </div>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${isValidLength ? styles.clear : ""}`} />
                        <p className={`${styles.valText} ${isValidLength ? styles.clear : ""}`}>
                            특수문자 (!,@,#,%,^,&,*,?,_,~)는 입력할 수 없습니다.
                        </p>
                    </div>
                </>
            )}

        </div>
    );
};

export default ValidationBox;