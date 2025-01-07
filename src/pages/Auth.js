import React from 'react';
import styles from '../styles/pages/Auth.module.scss'
import TimeStatus from "../layout/TimeStatus";
import XButton from "../components/XButton";

const Auth = () => {
    return (
        <>
            <TimeStatus/>
            <XButton
                from={'auth'}
                ui={'<-'}
            />
            <span className={styles.topLine}/>
            <div className={styles.container}>
                <h1 className={styles.title}>Market</h1>
                <div className={styles.inputGroup}>
                    <input type={"email"} className={styles.emailInput} placeholder={'이메일'}/>
                    <input type={'password'} className={styles.pwInput} placeholder={"비밀번호"}/>
                </div>
                <div className={styles.loginBtn}>로그인</div>
                <div className={styles.bottom}>
                    <div className={styles.register}>회원가입</div>
                    <div className={styles.findPw}>비밀번호 찾기</div>
                </div>
            </div>
        </>
    );
};

export default Auth;