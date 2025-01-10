import React, {useEffect, useState} from 'react';
import styles from "../../styles/pages/Register.module.scss";
import {FiCheck} from "react-icons/fi";
import {validateEmail} from "../../utils/validation";

const EmailValidation = ({ emailValue, checkValidate }) => {

    const [emailSuccess, setEmailSuccess] = useState(false);

    useEffect(() => {
        const isValid = validateEmail(emailValue);
        setEmailSuccess(isValid);
        if (typeof checkValidate === 'function') {
            checkValidate(isValid);
        }
    }, [emailValue, checkValidate]);

    return (
        <div className={styles.valContainer}>
            <div className={styles.valBox}>
                <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`}/>
                <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                    이메일 형식이 올바른지 확인해주세요.
                </p>
            </div>
        </div>
    );
};

export default EmailValidation;