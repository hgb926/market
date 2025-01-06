import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../components/store/ui/UiSlice';
import styles from '../styles/pages/WriteForm.module.scss';
import { IoClose } from 'react-icons/io5';
import {useNavigate} from "react-router-dom";

const WriteForm = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const [images, setImages] = useState([])
    const titleRef = useRef();

    // 페이지에 진입하면 MainNavigation 숨김 처리
    dispatch(uiActions.changeRenderStatus(false));

    const homeHandler = () => {
        navi('..')
    }

    const [tradeType, setTradeType] = useState('sell'); // 초기 값: 판매하기

    const handleTradeTypeChange = (e) => {
        setTradeType(e.target.value);
    };

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.header}>
                <IoClose className={styles.closeIcon} onClick={homeHandler}/>
                <h2>내 물건 팔기</h2>
                <span className={styles.draft}>임시저장</span>
            </div>

            {/* 이미지 업로드 */}
            <div className={styles.imageUpload}>
                <div className={styles.imageBox}>📷<span>0/10</span></div>
            </div>

            {/* 제목 입력 */}
            <div className={styles.inputGroup}>
                <label>제목</label>
                <input type="text" placeholder="글 제목"/>
            </div>

            <div className={styles.inputGroup}>
                <label>거래 방식</label>
                <div className={styles.radioGroup}>
                    <label className={tradeType === 'sell' ? styles.selected : ''}>
                        <input
                            type="radio"
                            name="tradeType"
                            value="sell"
                            checked={tradeType === 'sell'}
                            onChange={handleTradeTypeChange}
                        />
                        판매하기
                    </label>
                    <label className={tradeType === 'share' ? styles.selected : ''}>
                        <input
                            type="radio"
                            name="tradeType"
                            value="share"
                            checked={tradeType === 'share'}
                            onChange={handleTradeTypeChange}
                        />
                        나눔하기
                    </label>
                </div>
                {tradeType === 'sell' && (
                    <input type="text" placeholder="₩ 가격을 입력해주세요."/>
                )}
                 { tradeType === 'sell' && <div className={styles.checkbox}>
                    <input type="checkbox" id="suggestFlag"/>
                    <label htmlFor="suggestFlag">가격 제안 받기</label>
                </div>}
            </div>

            {/* 상세 설명 */}
            <div className={styles.inputGroup}>
                <label>자세한 설명</label>
                <textarea
                    placeholder="백석동에 올릴 게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)"
                ></textarea>
            </div>
            {/* 자주 쓰는 문구 버튼 */}
            <div className={styles.location}>
                거래 희망 장소
            </div>
            <input className={styles.locationInput} type="text" placeholder="장소를 입력해주세요."/>
            {/* 작성 완료 버튼 */}
            <button className={styles.submitButton}>작성 완료</button>
        </div>
    );
};

export default WriteForm;