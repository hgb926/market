import React from 'react';
import {uiActions} from "../components/store/ui/UiSlice";
import {useDispatch} from "react-redux";
import styles from '../styles/pages/Settings.module.scss';
import {useNavigate} from "react-router-dom";
import RadioButton from "../ui/RadioButton";
import {AUTH_URL} from "../config/host-config";
import MyPageHeader from "../components/auth/MyPageHeader";

const Settings = () => {
    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false));
    const navi = useNavigate();

    const logoutHandler = async () => {
        await fetch(`${AUTH_URL}/logout`, {
            method: 'GET',
            credentials: 'include'
        })

        navi('/auth')
    }

    return (
        <div className={styles.container}>
            <MyPageHeader title={'설정'}/>
            <div className={styles.mainContainer}>
                <div className={styles.menuWrap}>
                    <p className={styles.category}>알림설정</p>
                    <div className={styles.menus}>알림 수신 설정</div>
                    <div className={styles.disturb}>
                        <div>방해금지 시간 설정</div>
                        <RadioButton/>
                    </div>
                </div>
                <div className={styles.menuWrap}>
                    <p className={styles.category}>사용자 설정</p>
                    <div className={styles.menus}>계정 / 정보 관리</div>
                    <div className={styles.menus}>모아보기 사용자 관리</div>
                    <div className={styles.menus}>차단 사용자 관리</div>
                    <div className={styles.menus}>게시글 미노출 사용자 관리</div>
                    <div className={styles.menus}>
                        <div>동영상 자동 재생 설정</div>
                        <div className={styles.option}>항상 사용</div>
                    </div>
                    <div className={styles.menus}>중고거래 게시글의 동네 변경하기</div>
                    <div className={styles.menus}>기타 설정</div>
                </div>
                <div className={styles.menuWrap}>
                    <p className={styles.category}>기타</p>
                    <div className={styles.menus}>공지사항</div>
                    <div className={styles.menus}>국가 변경</div>
                    <div className={styles.menus}>
                        <div>언어 설정</div>
                        <div className={styles.option}>한국어</div>
                    </div>
                    <div className={styles.menus}>캐시 데이터 삭제</div>
                    <div className={styles.menus} onClick={logoutHandler}>로그아웃</div>
                    <div className={styles.menus}>탈퇴하기</div>
                </div>
            </div>
        </div>
    );
};

export default Settings;