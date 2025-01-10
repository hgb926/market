import React, { useRef, useState, useEffect } from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import PasswordValidation from "./PasswordValidation";

const Password = ({ getPassword }) => {
    const [pwValidate, setPwValidate] = useState(false); // 비밀번호 검증 상태
    const [pwValue, setPwValue] = useState(''); // 비밀번호 입력값
    const [pwCheckValue, setPwCheckValue] = useState(''); // 비밀번호 확인 입력값
    const [hidePw, setHidePw] = useState(false); // 비밀번호 보기/숨기기 토글

    const pwRef = useRef();
    const pwCheckRef = useRef();

    // 비밀번호 입력 핸들러
    const pwValueChangeHandler = (e) => {
        setPwValue(e.target.value);
    };

    // 비밀번호 확인 입력 핸들러
    const pwCheckValueChangeHandler = (e) => {
        setPwCheckValue(e.target.value);
    };

    // 비밀번호 검증 로직
    useEffect(() => {
        const isValid = pwValue && pwCheckValue && pwValue === pwCheckValue;
        setPwValidate(isValid);

        if (isValid) {
            getPassword(pwValue); // 일치할 때만 부모로 전달
        } else {
            getPassword(false)
        }
    }, [pwValue, pwCheckValue, getPassword]);

    // 비밀번호 보기/숨기기 토글
    const togglePasswordVisibility = () => {
        setHidePw((prev) => !prev);
    };

    return (
        <>
            <MainTitle title={'비밀번호를 입력해주세요.'} />
            <div className={styles.subContainer}>
                {/* 비밀번호 입력 */}
                <div className={styles.inputWrap}>
                    <input
                        type={hidePw ? 'text' : 'password'}
                        ref={pwRef}
                        placeholder={'비밀번호'}
                        className={styles.input}
                        onChange={pwValueChangeHandler}
                        value={pwValue}
                    />
                    <div
                        className={styles.sendCode}
                        onClick={togglePasswordVisibility}
                    >
                        {hidePw ? '가리기' : '보기'}
                    </div>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div className={styles.inputWrap}>
                    <input
                        type={'password'}
                        ref={pwCheckRef}
                        placeholder={'비밀번호 확인'}
                        className={styles.input}
                        onChange={pwCheckValueChangeHandler}
                        value={pwCheckValue}
                    />
                </div>

                {/* 검증 박스 */}
                <PasswordValidation
                    pwValue={pwValue}
                />
            </div>
        </>
    );
};

export default Password;