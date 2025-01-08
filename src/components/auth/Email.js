import React, {useRef, useState} from 'react';
import styles from '../../styles/pages/Register.module.scss'
import MainTitle from "./MainTitle";
import {AUTH_URL} from "../../config/host-config";
import ValidationBox from "./ValidationBox";

const Email = () => {
    const emailRef = useRef();
    const codeRef = useRef();
    const [createCodeInput, setCreateCodeInput] = useState(false)

    const sendCodeHandler = async () => {
        const response = await fetch(`${AUTH_URL}/send-code`);
        let data = await response.json();
        console.log(data)
        setCreateCodeInput(true)
    }

    return (
        <>
            <MainTitle title={'이메일을 입력해주세요.'}/>
            <div className={styles.subContainer}>
                <div className={styles.inputWrap}>
                    <input
                        type={'email'}
                        ref={emailRef}
                        placeholder={'이메일'}
                        className={styles.input}
                    />
                    <div className={styles.sendCode} onClick={sendCodeHandler}>인증번호 발송</div>
                </div>
                {createCodeInput && <div className={styles.inputWrap}>
                    <input
                        type={'text'}
                        ref={codeRef}
                        placeholder={'인증코드'}
                        className={styles.input}
                    />
                    <div className={styles.sendCode} >확인</div>
                </div>}
                <ValidationBox currentStep={'email'}/>
            </div>
        </>
    );
};

export default Email;