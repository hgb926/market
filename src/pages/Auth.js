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
            <div className={styles.container}>
                {/*<div className={styles.buttonWrap}>*/}
                {/*    <div>로그인</div>*/}
                {/*    <div>회원가입</div>*/}
                {/*</div>*/}
                {/*<p className={styles.findPw}>비밀번호 찾기</p>*/}
            </div>
        </>
    );
};

export default Auth;