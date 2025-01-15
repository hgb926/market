import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { uiActions } from '../components/store/ui/UiSlice';
import styles from '../styles/pages/WriteForm.module.scss';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import ImageUpload from "../components/ImageUpload";
import CategoryDropdown from "../components/CategoryDropdown";
import {sliceDetailAddress} from "../utils/sliceAddress";
import {POST_URL} from "../config/host-config";

const WriteForm = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const id = localStorage.getItem('id');
    let {address, profileUrl, nickname} = useSelector(state => state.userInfo.userData) || "하아";
    address = sliceDetailAddress(address)

    const [images, setImages] = useState([]); // 이미지 목록
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [suggestFlag, setSuggestFlag] = useState(false)
    const [content, setContent] = useState('')
    const [wantPlace, setWantPlace] = useState('')

    const categorySelectHandler = (category) => {
        setCategory(category);
    };


    // 페이지 진입 시 MainNavigation 숨김
    dispatch(uiActions.changeRenderStatus(false));

    const homeHandler = () => {
        navi('..');
    };

    const [tradeType, setTradeType] = useState('sell'); // 초기 값: 판매하기

    const typeChangeHandler = (e) => {
        setTradeType(e.target.value);
    };

    const getImages = (data) => {
        setImages(data)
    }

    const submitHandler = async () => {
        const formData = new FormData();
        formData.append("writerId", id);
        formData.append("writerInfo", JSON.stringify({ nickname, address, profileUrl }));
        formData.append("title", title);
        formData.append("price", price);
        formData.append("suggestFlag", suggestFlag);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("wantPlace", wantPlace);
        formData.append("tradeType", tradeType);

        images.forEach((imageFile) => {
            formData.append("images", imageFile); // 파일 객체를 추가
        });



        try {
            const response = await fetch(`${POST_URL}/add`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();

                navi('/');
            } else {
                const error = await response.text();
                console.error("Error:", error);
            }
        } catch (err) {
            console.error("Error submitting the post:", err);
        }
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
            <ImageUpload
                getImages={getImages}
            />

            {/* 제목 입력 */}
            <div className={styles.inputGroup}>
                <label>제목</label>
                <input
                    type="text"
                    placeholder="글 제목"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.inputGroup}>
                <label>카테고리</label>
                <CategoryDropdown onCategorySelect={categorySelectHandler} />
            </div>

            {/* 거래 방식 */}
            <div className={styles.inputGroup}>
                <label>거래 방식</label>
                <div className={styles.radioGroup}>
                    <label className={tradeType === 'sell' ? styles.selected : ''}>
                        <input
                            type="radio"
                            name="tradeType"
                            value="sell"
                            checked={tradeType === 'sell'}
                            onChange={typeChangeHandler}
                        />
                        판매하기
                    </label>
                    <label className={tradeType === 'share' ? styles.selected : ''}>
                        <input
                            type="radio"
                            name="tradeType"
                            value="share"
                            checked={tradeType === 'share'}
                            onChange={typeChangeHandler}
                        />
                        나눔하기
                    </label>
                </div>
                {tradeType === 'sell' && (
                    <input
                        type="number"
                        placeholder="₩ 가격을 입력해주세요."
                        onChange={(e) => setPrice(e.target.value)}
                    />
                )}
                {tradeType === 'sell' && (
                    <div className={styles.checkbox}>
                        <input
                            type="checkbox"
                            id="suggestFlag"
                            onChange={(e) => setSuggestFlag(!suggestFlag)}
                        />
                        <label htmlFor="suggestFlag">가격 제안 받기</label>
                    </div>
                )}
            </div>

            {/* 상세 설명 */}
            <div className={styles.inputGroup}>
                <label>자세한 설명</label>
                <textarea
                    placeholder="백석동에 올릴 게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)"
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            {/* 거래 희망 장소 */}
            <div className={styles.location}>거래 희망 장소</div>
            <input
                className={styles.locationInput}
                type="text"
                placeholder="장소를 입력해주세요."
                onChange={(e) => setWantPlace(e.target.value)}
            />

            {/* 작성 완료 버튼 */}
            <div className={styles.submitButton} onClick={submitHandler}>작성 완료</div>
        </div>
    );
};

export default WriteForm;