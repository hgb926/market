import React, {useState} from 'react';
import styles from '../styles/pages/Register.module.scss'

const Register = () => {
    // email, password, username, address, profileImage 받아야함
    // Register.module.scss에서 다 처리하도록?
    // step도
    const [currentStep, setCurrentStep] = useState(1)

    const increase = () => {
        setCurrentStep(prev => prev +1)
    }
    return (
        <div className={styles.container}>
            <div className={styles.stepBar}>
                <div className={styles.dynamic} style={{
                    width: `${currentStep * 20}%`
                }}></div>
            </div>
            <div onClick={increase}>z</div>
        </div>
    );
};

export default Register;