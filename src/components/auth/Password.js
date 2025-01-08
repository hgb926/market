import React from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import ValidationBox from "./ValidationBox";

const Password = () => {
    return (
        <>
            <MainTitle title={'비밀번호를 입력해주세요.'}/>
            <div className={styles.subContainer}>
                <div className={styles.inputWrap}>
                    <input
                        type={'password'}
                        placeholder={'비밀번호'}
                        className={styles.input}
                    />
                    <div className={styles.sendCode} >비밀번호 보기</div>
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type={'password'}
                        placeholder={'비밀번호 확인'}
                        className={styles.input}
                    />
                </div>
                <ValidationBox currentStep={'password'}/>
            </div>
        </>
    );
};

export default Password;