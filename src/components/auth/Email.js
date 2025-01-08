import React, {useRef} from 'react';
import styles from '../../styles/pages/Register.module.scss'
import MainTitle from "./MainTitle";
import {AUTH_URL} from "../../config/host-config";

const Email = () => {
    const emailRef = useRef();

    const sendCodeHandler = async () => {
        const response = await fetch(`${AUTH_URL}/send-code`);
        let data = await response.json();
        console.log(data)
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
                <div></div>
            </div>
        </>
    );
};

export default Email;