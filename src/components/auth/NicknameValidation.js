import React, {useEffect, useState} from 'react';
import styles from "../../styles/pages/Register.module.scss";
import {FiCheck} from "react-icons/fi";
import {validateNickname} from "../../utils/validation";

const NicknameValidation = ({ checkValidate, nickValue, sendNicknameMsg }) => {

    // 닉네임 검증 상태
    const [isValidNicknameLength, setIsValidNicknameLength] = useState(false);
    const [hasNotSpecialChar, setHasNotSpecialChar] = useState(false);
    const [nicknameDuplicate, setNicknameDuplicate] = useState(false)
    const [nicknameErrMsg, setNicknameErrMsg] = useState(sendNicknameMsg)

    // ✅ 닉네임 검증
    useEffect(() => {
        if (nickValue) {
            const {isValidLength, hasNotSpecialChar} = validateNickname(nickValue);
            setIsValidNicknameLength(isValidLength);
            setHasNotSpecialChar(hasNotSpecialChar);
            if (isValidLength && hasNotSpecialChar) {
                checkValidate(true);
            } else {
                checkValidate(false);
            }
        } else {
            setIsValidNicknameLength(false);
            setHasNotSpecialChar(true);
        }
    }, [nickValue, checkValidate]);

    useEffect(() => {
        if (sendNicknameMsg === '사용 가능한 닉네임입니다!') setNicknameDuplicate(true)
        else setNicknameDuplicate(false)
        setNicknameErrMsg(sendNicknameMsg); // props가 변경될 때 상태 업데이트
    }, [sendNicknameMsg]);



    return (
        <div className={styles.valContainer}>
            <div className={styles.valBox}>
                <FiCheck className={`${styles.check} ${isValidNicknameLength ? styles.clear : ""}`}/>
                <p className={`${styles.valText} ${isValidNicknameLength ? styles.clear : ""}`}>
                    글자수는 2 ~ 8 사용해야 합니다.</p>
            </div>
            <div className={styles.valBox}>
                <FiCheck className={`${styles.check} ${hasNotSpecialChar ? styles.clear : ""}`}/>
                <p className={`${styles.valText} ${hasNotSpecialChar ? styles.clear : ""}`}>
                    특수문자 (!,@,#,%,^,&,*,?,_,~)는 <br/>사용하실 수 없습니다.</p>
            </div>
            <div className={styles.valBox}>
                <FiCheck className={`${styles.check} ${nicknameDuplicate ? styles.clear : ""}`}/>
                <p className={`${styles.valText} ${nicknameDuplicate ? styles.clear : ""}`}>
                    {nicknameErrMsg}</p>
            </div>
        </div>
    );
};

export default NicknameValidation;