import React, {useRef, useState} from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import ValidationBox from "./ValidationBox";

const Nickname = ({getNickname}) => {

    const [nicknameValue, setNicknameValue] = useState('')
    const [nicknameValidate, setNicknameValidate] = useState(false)
    const nicknameRef = useRef();

    const nicknameChangeHandler = (e) => {
        setNicknameValue(e.target.value)
    }

    const checkValidate = flag => {
        setNicknameValidate(flag)
    }

    const checkDuplicate = () => {
        if (!nicknameValidate) return;
        getNickname(nicknameValue)
    }
    return (
        <>
            <MainTitle title={'닉네임을 입력해주세요.'}/>
            <div className={styles.subContainer}>
                <div className={styles.inputWrap}>
                    <input
                        type={'text'}
                        ref={nicknameRef}
                        placeholder={'닉네임'}
                        className={styles.input}
                        onChange={nicknameChangeHandler}
                    />
                    <div
                        className={styles.sendCode}
                        onClick={checkDuplicate}
                    >
                        중복확인
                    </div>

                </div>
                <ValidationBox
                    currentStep={'nickname'}
                    nickValue={nicknameValue}
                    checkValidate={checkValidate}
                />
            </div>
        </>
    );
};

export default Nickname;