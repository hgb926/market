import React, {useRef, useState} from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import ValidationBox from "./ValidationBox";

const Password = ({ getPassword }) => {

    const [pwValidate, setPwValidate] = useState(false)
    const [pwValue, setPwValue] = useState('')
    const [hidePw, setHidePw] = useState(false)
    const pwRef = useRef();
    const pwCheckRef = useRef();


    const checkValidate = (flag) => {
        setPwValidate(flag)
    }

    const pwValueChangeHandler = e => {
        setPwValue(e.target.value)
    }
    const pwCheckValueChangeHandler = e => {
        if (e.target.value === pwValue) {
            getPassword(pwValue)
        }
    }

    const togglePasswordVisibility = () => {
        setHidePw(prev => !prev)
    }


    return (
        <>
            <MainTitle title={'비밀번호를 입력해주세요.'}/>
            <div className={styles.subContainer}>
                <div className={styles.inputWrap}>
                    <input
                    type={hidePw ? 'text' : 'password'}
                    ref={pwRef}
                    placeholder={'비밀번호'}
                    className={styles.input}
                    onChange={pwValueChangeHandler}/>
                    <div
                        className={styles.sendCode}
                        onClick={togglePasswordVisibility}
                    >
                        {hidePw ? '가리기' : '보기'}
                    </div>

                </div>
                <div className={styles.inputWrap}>
                    <input
                        type={'password'}
                        ref={pwCheckRef}
                        placeholder={'비밀번호 확인'}
                        className={styles.input}
                        onChange={pwCheckValueChangeHandler}
                    />
                </div>
                <ValidationBox
                    currentStep={'password'}
                    pwValue={pwValue}
                    checkValidate={checkValidate}
                />
            </div>
        </>
    );
};

export default Password;