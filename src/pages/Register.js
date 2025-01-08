import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Register.module.scss'
import Email from "../components/auth/Email";
import MainTitle from "../components/auth/MainTitle";
import Password from "../components/auth/Password";

const Register = () => {
    // email, password, username, address, profileImage 받아야함
    // Register.module.scss에서 다 처리하도록?
    // step도
    const [currentStep, setCurrentStep] = useState(1)
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState('')

    const increase = () => {
        setCurrentStep(prev => prev +1)
        setActive(false)
    }

    const getEmail = (email) => {
        setActive(true)
        setEmail(email);
    }
    console.log(email)

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
            { currentStep === 2 && <Password/>}
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