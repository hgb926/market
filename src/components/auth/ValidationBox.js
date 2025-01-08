import React, {useEffect, useState} from 'react';
import styles from "../../styles/pages/Register.module.scss";
import {FiCheck} from "react-icons/fi";

const ValidationBox = ({ currentStep, emailValue }) => {

    const [emailSuccess, setEmailSuccess] = useState(false)

    useEffect(() => {
        if (emailValue.includes("@") && emailValue.includes('.') && emailValue.slice(-3) === "com") {
            setEmailSuccess(true)
        } else {
            setEmailSuccess(false)
        }
    }, [emailValue]);


    return (
        <div className={styles.valContainer}>
            {currentStep === "email" &&
                <div className={styles.valBox}>
                    <FiCheck className={`${styles.check} ${emailSuccess ? styles.clear : ""}`}/>
                    <p className={`${styles.valText} ${emailSuccess ? styles.clear : ""}`}>
                        이메일 형식이 올바른지 확인해주세요.
                    </p>
                </div>
            }
            {currentStep === "password" &&
                <div></div>
            }
        </div>
    );
};

export default ValidationBox;