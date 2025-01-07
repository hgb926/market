import React from 'react';
import styles from '../styles/pages/Auth.module.scss'
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <>
            <span className={styles.topLine}/>
            <div className={styles.container}>
                <h1 className={styles.title}>Market</h1>
                <div className={styles.inputGroup}>
                    <input type={"email"}  placeholder={'이메일'}/>
                    <input type={'password'} placeholder={"비밀번호"}/>
                </div>
                <div className={styles.loginBtn}>로그인</div>
                <div className={styles.bottom}>
                    <Link to={'register'} className={styles.register}>회원가입</Link>
                    <div className={styles.findPw}>비밀번호 찾기</div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;