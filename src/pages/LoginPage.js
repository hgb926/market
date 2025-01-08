import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/pages/LoginPage.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {validateEmail, validatePassword,} from '../utils/validation';
import {AUTH_URL} from "../config/host-config";


const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [autoLogin, setAutoLogin] = useState(false)
    const [active, setActive] = useState(false)
    const emailRef = useRef();
    const pwRef = useRef();
    const navi = useNavigate();


    // 로그인 하기

    const loginHandler = async () => {
        if (!active) return
        const payload = {
            email,
            password: pw,
            autoLogin
        }
        console.log(payload)
        const response = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: {"Content-Type" : "Application/json"},
            body: JSON.stringify(payload)
        });
        if (response.status === 200) {
            const userData = await response.json();
            localStorage.setItem('userData', JSON.stringify(userData.user))
            navi('/')
        } else {
            const userData = await response.json();
            alert(userData.message)
        }
    }

    useEffect(() => {
        const {hasNumber, isValidLength, hasSpecialChar} = validatePassword(pw);
        const isValidEmail = validateEmail(email);

        if (isValidEmail && hasNumber && isValidLength && hasSpecialChar) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [email, pw]);

    return (
        <>
            <span className={styles.topLine}/>
            <div className={styles.container}>
                <h1 className={styles.title}>Market</h1>
                <div className={styles.inputGroup}>
                    <input
                        type={"email"}
                        placeholder={'이메일'}
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={'password'}
                        placeholder={"비밀번호"}
                        ref={pwRef}
                        onChange={(e) => setPw(e.target.value)}
                    />
                    <div className={styles.autoLoginWrap}>
                        <input
                            type={'checkbox'}
                            id="autoLogin"
                            className={styles.autoLogin}
                            onChange={() => setAutoLogin(!autoLogin)}
                        />
                        <label htmlFor="autoLogin" className={styles.autoLoginLabel} onChange={() => setAutoLogin(!autoLogin)}>
                            자동 로그인
                        </label>
                    </div>
                </div>
                <div
                    className={`${styles.loginBtn} ${active ? styles.active : ''}`}
                    onClick={loginHandler}>
                    로그인
                </div>
                <div className={styles.bottom}>
                    <Link to={'register'} className={styles.register}>회원가입</Link>
                    <div className={styles.findPw}>비밀번호 찾기</div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;