import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/Register.module.scss'
import Email from "../components/auth/Email";
import Password from "../components/auth/Password";
import Nickname from "../components/auth/Nickname";
import Address from "../components/auth/Address";
import UserImage from "../components/auth/UserImage";
import {current} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";

const Register = () => {

    // email, password, username, address, profileImage 받아야함
    const [currentStep, setCurrentStep] = useState(5)
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [address, setAddress] = useState('')
    const [zoneCode, setZoneCode] = useState('')
    const [image, setImage] = useState('')
    const navi = useNavigate();

    const increase = () => {
        if (currentStep > 4) {
            alert('회원가입이 완료되었습니다.')
            navi(-1)
        }
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

    const getAddress = (add) => {
        setActive(true)
        setAddress(add)
    }

    const getZoneCode = (zoneCode) => {
        setZoneCode(zoneCode)
    }

    const getImage = (image) => {
        setActive(true)
        setImage(image)
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
            { currentStep === 4 && <Address getAddress={getAddress} getZoneCode={getZoneCode}/> }
            { currentStep === 5 && <UserImage getImage={getImage}/>}
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