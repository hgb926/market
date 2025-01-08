import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Register.module.scss'
import Email from "../components/auth/Email";
import Password from "../components/auth/Password";
import Nickname from "../components/auth/Nickname";

const Register = () => {

    // email, password, username, address, profileImage 받아야함
    const [currentStep, setCurrentStep] = useState(3)
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    const increase = () => {
        if (!active) return
        setCurrentStep(prev => prev +1)
        setActive(false)
    }

    const getEmail = (email) => {
        setActive(true)
        setEmail(email);
    }

    const getPassword = (pw) => {
        setActive(true)
        setPassword(pw)
    }

    const getNickname = (name) => {
        setActive(true)
        setNickname(name)
    }

    useEffect(() => {

    }, [currentStep]);


    return (
        <div className={styles.container}>
            <div className={styles.stepBar}>
                <div className={styles.dynamic} style={{
                    width: `${currentStep * 20}%`
                }}></div>
            </div>
            { currentStep === 1 && <Email getEmail={getEmail}/>}
            { currentStep === 2 && <Password getPassword={getPassword}/>}
            { currentStep === 3 && <Nickname getNickname={getNickname}/>}
            <span className={styles.line}></span>
            <div
                className={`${styles.next} ${active ? styles.active : ""}`}
                onClick={increase}
            >
                다음
            </div>
        </div>
    );
};

export default Register;