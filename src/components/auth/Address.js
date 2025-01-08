import React, { useState } from 'react';
import MainTitle from "./MainTitle";
import DaumPostcode from 'react-daum-postcode';
import styles from "../../styles/pages/Register.module.scss";

const Address = ({ getAddress, getZoneCode }) => {

    const [addressValue, setAddressValue] = useState(''); // 주소 상태
    const [zoneCode, setZoneCode] = useState('')
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태

    // 주소 선택 완료 핸들러
    const completeHandler = (data) => {
        setAddressValue(data.address); // 주소 상태 업데이트
        setZoneCode(data.zonecode)
        setModalOpen(false); // 모달 닫기
        getAddress(data.address); // 부모 컴포넌트로 주소 전달
        getZoneCode(data.zonecode)
    };

    // 모달 스타일
    const postCodeStyle = {
        width: '380px',
        height: '480px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: "fixed",
        top: '320px',
        left: '10px'
    };

    return (
        <>
            {/* 제목 */}
            <MainTitle title={'주소를 입력해주세요.'} />

            {/* 주소 입력 필드 */}
            <div className={styles.subContainer}>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="주소를 선택해주세요."
                        className={styles.input}
                        value={addressValue}
                        readOnly // 읽기 전용
                    />
                    <div
                        className={styles.sendCode}
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        주소 검색
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="우편번호"
                        className={styles.input}
                        value={zoneCode}
                        readOnly // 읽기 전용
                    />
                </div>
            </div>

            {/* 주소 검색 모달 */}
            {modalOpen && (
                <DaumPostcode
                    style={postCodeStyle}
                    onComplete={completeHandler}
                />
            )}
        </>
    );
};

export default Address;