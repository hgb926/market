import React, { useRef, useState, useEffect } from 'react';
import styles from '../../styles/pages/Register.module.scss';
import MainTitle from "./MainTitle";
import { AUTH_URL } from "../../config/host-config";
import ValidationBox from "./ValidationBox";

const Email = ({ getEmail }) => {
    const emailRef = useRef();
    const codeRef = useRef();
    const [createCodeInput, setCreateCodeInput] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [codeValue, setCodeValue] = useState('');
    const [valCode, setValCode] = useState('');
    const [emailValidation, setEmailValidation] = useState(false);
    const [codeValidation, setCodeValidation] = useState(false);

    const sendCodeHandler = async () => {
        try {
            const response = await fetch(`${AUTH_URL}/send-code`);
            let data = await response.json();
            console.log(data);
            setValCode(data);
            setCreateCodeInput(true);
        } catch (error) {
            console.error("Error sending code:", error);
        }
    };

    const emailValueChangeHandler = (e) => {
        setEmailValue(e.target.value);
    };

    const checkValidate = (flag) => {
        setEmailValidation(flag);
    };

    const codeValueChangeHandler = (e) => {
        setCodeValue(e.target.value);
    };

    const codeCheckHandler = () => {

        if (valCode.toString() === codeValue.toString()) {
            setCodeValidation(true);
            if (emailValidation) getEmail(emailValue);
        } else {
            alert("코드 불일치");
        }
    };

    useEffect(() => {
        if (codeValidation && emailValidation) {
            getEmail(emailValue);
        }
    }, [codeValidation, emailValidation, getEmail]);

    return (
        <>
            <MainTitle title={'이메일을 입력해주세요.'} />
            <div className={styles.subContainer}>
                <div className={styles.inputWrap}>
                    <input
                        type={'email'}
                        ref={emailRef}
                        placeholder={'이메일'}
                        className={styles.input}
                        onChange={emailValueChangeHandler}
                    />
                    <div
                        className={`${styles.sendCode} ${emailValidation ? styles.clear : ""}`}
                        onClick={sendCodeHandler}
                    >
                        인증번호 발송
                    </div>
                </div>
                {createCodeInput && (
                    <div className={styles.inputWrap}>
                        <input
                            type={'text'}
                            ref={codeRef}
                            placeholder={'4자리의 인증코드'}
                            className={styles.input}
                            onChange={codeValueChangeHandler}
                        />
                        <div
                            className={`${styles.sendCode} ${codeValidation ? styles.clear : ""}`}
                            onClick={codeCheckHandler}
                        >
                            확인
                        </div>
                    </div>
                )}
                <ValidationBox
                    currentStep={'email'}
                    emailValue={emailValue}
                    checkValidate={checkValidate}
                />
            </div>
        </>
    );
};

export default Email;