import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/pages/LoginPage.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {validateEmail, validatePassword,} from '../utils/validation';
import {AUTH_URL} from "../config/host-config";
import {useDispatch} from "react-redux";
import {userActions} from "../components/store/user/UserSlice";


const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [autoLogin, setAutoLogin] = useState(false)
    const [active, setActive] = useState(false)
    const emailRef = useRef();
    const pwRef = useRef();
    const navi = useNavigate();
    const dispatch = useDispatch();


    // 로그인 하기
    const loginHandler = async () => {
        if (!active) return;

        const payload = { email, password: pw, autoLogin};
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include', // 쿠키 포함
        });

        if (response.status === 200) {
            const userData = await response.json();
            console.log(userData)
            dispatch(userActions.setUser(userData))
            navi('/');
        } else {
            const { message } = await response.json();
            alert(message);
        }
    };


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