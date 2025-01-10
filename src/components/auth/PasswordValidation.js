import React, {useEffect, useState} from 'react';
import styles from "../../styles/pages/Register.module.scss";
import {FiCheck} from "react-icons/fi";
import {validatePassword} from "../../utils/validation";

const PasswordValidation = ({pwValue}) => {

    // 비밀번호 검증 상태
    const [hasNumber, setHasNumber] = useState(false);
    const [isValidPwLength, setIsValidPwLength] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    useEffect(() => {
        if (pwValue) {
            const {hasNumber, isValidLength, hasSpecialChar} = validatePassword(pwValue);
            setHasNumber(hasNumber);
            setIsValidPwLength(isValidLength);
            setHasSpecialChar(hasSpecialChar);
        } else {
            setHasNumber(false);
            setIsValidPwLength(false);
            setHasSpecialChar(false);
        }
    }, [pwValue]);

    return (
        <div className={styles.valContainer}>
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${hasNumber ? styles.clear : ""}`}/>
                    <p className={`${styles.valText} ${hasNumber ? styles.clear : ""}`}>
                        1개 이상의 숫자를 사용해야 합니다.
                    </p>
                </div>
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${isValidPwLength ? styles.clear : ""}`}/>
                    <p className={`${styles.valText} ${isValidPwLength ? styles.clear : ""}`}>
                        길이가 8자리 이상 되어야 합니다.
                    </p>
                </div>
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${hasSpecialChar ? styles.clear : ""}`}/>
                    <p className={`${styles.valText} ${hasSpecialChar ? styles.clear : ""}`}>
                        1개 이상의 특수문자 (!,@,#,%,^,&,*,?,_,~)를 <br/>사용해야 합니다.
                    </p>
                </div>
        </div>
    );
};

export default PasswordValidation;
