import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {CHAT_URL} from '../config/host-config';
import ChatRoomHeader from '../components/chat/ChatRoomHeader'
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import PostInfo from "../components/chat/PostInfo";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import ChatSpinner from "../skeleton/ChatSpinner";

const ChatRoom = () => {
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    const chatContainerRef = useRef(null);
    const inputRef = useRef();
    const navigate = useNavigate();
    const {id: roomId} = useParams();
    const userId = localStorage.getItem('id');

    dispatch(uiActions.changeRenderStatus(false))

    const fetchChatInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${CHAT_URL}/detail?id=${roomId}`);
            if (response.status === 200) {
                const data = await response.json();
                setTimeout(() => {
                    setChat(data);
                    console.log(data)
                    setLoading(false);
                }, 200)
            }
        } catch (e) {
            console.error('Error fetching chat info:', e);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${CHAT_URL}/chat-detail?id=${roomId}`);
            if (response.status === 200) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (e) {
            console.error('Error fetching messages:', e);
        } finally {
            setLoading(true);
        }
    };

    const setupWebSocket = () => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws);

        ws.onopen = () => {
            ws.send(JSON.stringify({event: 'joinRoom', room: roomId}));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === 'serverToClient') {
                setMessages((prev) => [...prev, data]);
            }
        };

        return () => ws.close();
    };


    const sendMessage = () => {
        if (socket && text.trim()) {
            const message = {
                event: 'sendMessage',
                room: roomId,
                text,
                writer: userId,
                taker: chat.customerInfo.customerId === userId ? chat.sellerInfo.sellerId : chat.customerInfo.customerId
            };
            socket.send(JSON.stringify(message));
            setText('');
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        fetchChatInfo();
        fetchMessages();
        const cleanUp = setupWebSocket();
        return cleanUp;
    }, [roomId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (loading || !chat) return <ChatSpinner/>

    return (
        <>
            <ChatRoomHeader chat={chat} userId={userId} onBack={() => navigate('/chat')}/>
            <PostInfo chat={chat}/>
            <ChatMessages messages={messages} userId={userId} chat={chat}/>
            <ChatInput
                text={text}
                onChange={setText}
                onSend={sendMessage}
                inputRef={inputRef}
            />
        </>
    );
};

export default ChatRoom;