import React, { useEffect, useState } from 'react';
import styles from "../../styles/pages/Register.module.scss";
import { FiCheck } from "react-icons/fi";

const ValidationBox = ({ currentStep, emailValue, checkValidate }) => {
    const [emailSuccess, setEmailSuccess] = useState(false);

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

    return (
        <div className={styles.valContainer}>

            {currentStep === "email" && (
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`} />
                    <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                        이메일 형식이 올바른지 확인해주세요.
                    </p>
                </div>
            )}

            {currentStep === "password" && (
                <>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`}/>
                        <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                            1개 이상의 숫자를 사용해야 합니다.
                        </p>
                    </div>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`}/>
                        <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                            8자리 이상으로 사용해야 합니다.
                        </p>
                    </div>
                    <div className={styles.valBox}>
                        <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`}/>
                        <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                            1개 이상의 특수문자 (!,@,#,%,^,&,*,?,_,~)<br/>를 사용해야 합니다.
                        </p>
                    </div>
                </>
            )}

        </div>
    );
};

export default ValidationBox;