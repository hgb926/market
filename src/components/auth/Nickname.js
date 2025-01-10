import React, {useRef, useState} from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import ValidationBox from "./ValidationBox";
import {AUTH_URL} from "../../config/host-config";

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

    const checkDuplicate = async () => {
        if (!nicknameValidate) return;
        try {
            const response = await fetch(`${AUTH_URL}/check-nickname`, {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({nickname: nicknameValue})
            })

            if (response.status === 200) {
                let data = await response.text();
                console.log(data);
                getNickname(nicknameValue)
            } else {
                let data = await response.text();
                alert(data)
            }

        } catch (e) {
            console.log(e)
        }


    }

    const enterKeyHandler = (e) => {
        if (e.key === 'Enter') {
            checkDuplicate()
        }
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
                        onKeyDown={(e) => enterKeyHandler(e)}
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