import React from 'react';
import styles from "../../styles/pages/Register.module.scss";
import {FiCheck} from "react-icons/fi";

const ValidationBox = ({ currentStep }) => {



    return (
        <div className={styles.valContainer}>
            {currentStep === "email" &&
                <div className={styles.valBox}>
                    <FiCheck className={styles.check}/>
                    <p className={styles.valText}>이메일 형식이 올바른지 확인해주세요.</p>
                </div>
            }
            {currentStep === "password" &&
                <div></div>
            }
        </div>
    );
};

export default ValidationBox;