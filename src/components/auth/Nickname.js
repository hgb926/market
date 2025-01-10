import React, {useEffect, useRef, useState} from 'react';
import MainTitle from "./MainTitle";
import styles from "../../styles/pages/Register.module.scss";
import {AUTH_URL} from "../../config/host-config";
import NicknameValidation from "./NicknameValidation";

const Nickname = ({getNickname}) => {

    const [nicknameValue, setNicknameValue] = useState('')
    const [nicknameValidate, setNicknameValidate] = useState(false)
    const nicknameRef = useRef();
    const [errMsg, setErrMsg] = useState('중복되지 않아야 합니다.')
    const [allClear, setAllClear] = useState(false)

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
                setErrMsg(data)
                setAllClear(true)
                getNickname(nicknameValue)
            } else {
                let data = await response.text();
                setAllClear(false)
                setErrMsg(data)
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

    }, [errMsg]);

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
                        className={`${styles.sendCode} ${allClear ? styles.clear : ''}`}
                        onClick={checkDuplicate}
                    >
                        중복확인
                    </div>

                </div>
                <NicknameValidation
                    nickValue={nicknameValue}
                    checkValidate={checkValidate}
                    sendNicknameMsg={errMsg}
                />
            </div>
        </>
    );
};

export default Nickname;