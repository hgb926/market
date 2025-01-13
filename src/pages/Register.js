import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/Register.module.scss'
import Email from "../components/auth/Email";
import Password from "../components/auth/Password";
import Nickname from "../components/auth/Nickname";
import Address from "../components/auth/Address";
import UserImage from "../components/auth/UserImage";
import { useNavigate } from "react-router-dom";
import {AUTH_URL} from "../config/host-config";

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [active, setActive] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [address, setAddress] = useState('');
    const [zoneCode, setZoneCode] = useState('');
    const [image, setImage] = useState('https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg');
    const [isTriedUploadImg, setIsTriedUploadImg] = useState(false);
    const [isValidImage, setIsValidImage] = useState(false);

    const navigate = useNavigate();

    const increase = async () => {
        if (currentStep > 4) {
            if (isTriedUploadImg && isValidImage) {
                alert('이미지 검증에 실패했습니다. 올바른 이미지를 업로드해주세요.');
                return;
            }

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("nickname", nickname);
            formData.append("address", address);
            formData.append("zoneCode", zoneCode);

            if (image) {
                formData.append("image", image); // 파일 객체 추가
            }

            const response = await fetch(`${AUTH_URL}/register`, {
                method: "POST",
                body: formData
            });

            alert('회원가입이 완료되었습니다.');
            navigate('/auth');
            return;
        }

        if (!active) return;
        setCurrentStep(prev => prev + 1);
        setActive(false);
    };

    const getEmail = (email) => {
        setActive(true);
        setEmail(email);
    };

    const getPassword = (pw) => {
        if (!pw) {
            setActive(false)
            setPassword('')
            return
        }
        setActive(true);
        setPassword(pw);
    };

    const getNickname = (name) => {
        setActive(true);
        setNickname(name);
    };

    const getAddress = (add) => {
        setActive(true);
        setAddress(add);
    };

    const getZoneCode = (zoneCode) => {
        setZoneCode(zoneCode);
    };

    const getImage = (image) => {
        setActive(true);
        setImage(image);
    };

    const getStatus = (flag) => {
        setIsTriedUploadImg(flag);
    };

    const setImageValidation = (flag) => {
        setIsValidImage(flag);
    };

    useEffect(() => {
        if (currentStep > 4) setActive(true);
    }, [currentStep]);

    return (
        <div className={styles.container}>
            <div className={styles.stepBar}>
                <div className={styles.dynamic} style={{
                    width: `${currentStep * 20}%`
                }}></div>
            </div>
            {currentStep === 1 && <Email getEmail={getEmail} />}
            {currentStep === 2 && <Password getPassword={getPassword} />}
            {currentStep === 3 && <Nickname getNickname={getNickname} />}
            {currentStep === 4 && <Address getAddress={getAddress} getZoneCode={getZoneCode} />}
            {currentStep === 5 && <UserImage getImage={getImage} currentStatus={getStatus} setImageValidation={setImageValidation} />}
            <span className={styles.line}></span>
            <div
                className={`${styles.next} ${(!isTriedUploadImg && currentStep > 4) || active ? styles.active : ""}`}
                onClick={increase}
            >
                {currentStep > 4 ? '가입 완료' : '다음'}
            </div>
        </div>
    );
};

export default Register;