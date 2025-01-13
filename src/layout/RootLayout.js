import React, {useEffect, useState} from 'react';
import styles from '../styles/layout/RootLayout.module.scss'
import {Outlet, useLocation, useParams} from "react-router-dom";
import {AUTH_URL, CHAT_URL} from "../config/host-config";
import {userActions} from "../components/store/user/UserSlice";
import {useDispatch} from "react-redux";
import ChatAlarm from "../components/chat/ChatAlarm";

const RootLayout = () => {

    const dispatch = useDispatch();
    const id = localStorage.getItem('id');
    const {id: roomId} = useParams();
    const [loginFlag, setLoginFlag] = useState(false)
    const [message, setMessage] = useState([])
    const [showAlarm, setShowAlarm] = useState(false)


    useEffect(() => {
        console.log(loginFlag)
        if (!loginFlag) return
        console.log(`요청 시작, ${id}`)
        const eventSource = new EventSource(`${CHAT_URL}/sse?userId=${id}`)

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            console.log(newMessage.room === roomId)
            if (newMessage.room === roomId) return
            console.log('새 메시지:', newMessage);
            setMessage(newMessage)
            setShowAlarm(true)
        };

        // SSE 연결 종료 시
        eventSource.onerror = () => {
            console.error('SSE 연결에 문제가 발생했습니다.');
            setShowAlarm(false)
        };

        return () => {
            eventSource.close();
        };
    }, [id]);

    // 자동로그인 체크
    const checkLogin = async () => {
        try {
            const response = await fetch(`${AUTH_URL}/user`, {
                method: 'GET',
                credentials: 'include', // 쿠키 포함
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('로그인 성공 : ', userData)
                setLoginFlag(true)
                dispatch(userActions.setUser(userData));
            } else {
                const { message } = await response.json();
                console.error('로그인 상태 확인 실패:', message);
                // 필요에 따라 사용자에게 알림
            }
        } catch (e) {
            console.error('서버 요청 중 오류 발생:', e);
            // 네트워크 오류 시 사용자에게 알림 추가
        }
    };
    useEffect(() => {
        if (id) checkLogin();
    }, [showAlarm]);


    return (
        <div className={styles.container}>
            {showAlarm && <ChatAlarm loginFlag={loginFlag} message={message} setShowAlarm={setShowAlarm}/>}
            <Outlet/>
        </div>
    );
};

export default RootLayout;