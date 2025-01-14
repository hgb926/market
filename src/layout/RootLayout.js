import React, {useEffect, useState} from 'react';
import styles from '../styles/layout/RootLayout.module.scss'
import {Outlet, useParams} from "react-router-dom";
import {AUTH_URL, CHAT_URL} from "../config/host-config";
import {userActions} from "../components/store/user/UserSlice";
import {useDispatch} from "react-redux";
import ChatAlarm from "../components/chat/ChatAlarm";
import {sseActions} from "../components/store/user/SseSlice";

const RootLayout = () => {

    const dispatch = useDispatch();
    const id = localStorage.getItem('id');
    const {id: roomId} = useParams();
    const [message, setMessage] = useState([])
    const [showAlarm, setShowAlarm] = useState(false)
    const [isConnect, setIsConnect] = useState(false)


    useEffect(() => {
        if (!id) return
        setIsConnect(true)
        console.log(`요청 시작, ${id}`)
        const eventSource = new EventSource(`${CHAT_URL}/sse?userId=${id}`)

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            if (newMessage.room === roomId) return
            dispatch(sseActions.setMessage(newMessage))
            setMessage(newMessage)
            setShowAlarm(true)
        };

        // SSE 연결 종료 시
        eventSource.onerror = () => {
            console.log('연결 끊김, 재연결 시도 중...');
            setShowAlarm(false)
            setIsConnect(true)
        };

        return () => {
            eventSource.close();
        };
    }, [id, isConnect]);

    // 자동로그인 체크
    const checkLogin = async () => {
        try {
            const response = await fetch(`${AUTH_URL}/user`, {
                method: 'GET',
                credentials: 'include', // 쿠키 포함
            });

            if (response.ok) {
                const userData = await response.json();
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
            {showAlarm && <ChatAlarm id={id} message={message} setShowAlarm={setShowAlarm}/>}
            <Outlet/>
        </div>
    );
};

export default RootLayout;