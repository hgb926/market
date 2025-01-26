import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {CHAT_URL, WEBSOCKET_URL} from '../config/host-config';
import ChatRoomHeader from '../components/chat/ChatRoomHeader'
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import PostInfo from "../components/chat/PostInfo";
import {useDispatch} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import Spinner from "../skeleton/Spinner";

const ChatRoom = () => {
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('')  // db에 넣을 url
    const [image, setImage] = useState('') // 메시지 전송 전 띄워줄 프리뷰
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    const chatContainerRef = useRef(null);
    const inputRef = useRef();
    const imageRef = useRef()
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

    const newMessageHandler = useCallback((newMessage) => {
        setMessages((prevMessages) => {
            if (prevMessages.some(msg => msg.date === newMessage.date)) {
                return prevMessages;
            }
            return [...prevMessages, newMessage];
        });
    }, []);

    const setupWebSocket = () => {
        const ws = new WebSocket(`${WEBSOCKET_URL}`);
        setSocket(ws);

        ws.onopen = () => {
            ws.send(JSON.stringify({event: 'joinRoom', room: roomId}));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === 'serverToClient') {
                newMessageHandler(data);
            }
        };

        return () => ws.close();
    };


    const sendMessage = () => {
        if (socket && (text.trim() || imageUrl)) {
            const message = {
                event: 'sendMessage',
                room: roomId,
                text: text || '',
                imageUrl : imageUrl || '',
                writer: userId,
                taker: chat.customerInfo.customerId === userId ? chat.sellerInfo.sellerId : chat.customerInfo.customerId
            };
            console.log(message)
            if (imageUrl) {
                setImage('')
                setImageUrl('')
            }
            socket.send(JSON.stringify(message));
            setText('');
            inputRef.current.value = '';
        }
    };


    useEffect(() => {
        let isMounted = true; // 메모리 누수 방지
        fetchChatInfo();
        fetchMessages();
        const cleanUp = setupWebSocket();

        return () => {
            isMounted = false;
            cleanUp();
        };
    }, [roomId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (loading || !chat) return <Spinner text={"대화"}/>

    return (
        <>
            <ChatRoomHeader
                chat={chat}
                userId={userId}
                onBack={() => navigate('/chat')}
            />
            <PostInfo chat={chat}/>
            <ChatMessages
                inputRef={inputRef}
                messages={messages}
                userId={userId}
                chat={chat}
            />
            <ChatInput
                text={text}
                onChange={setText}
                onSend={sendMessage}
                inputRef={inputRef}
                image={image}
                setImage={setImage}
                imageRef={imageRef}
                setImageUrl={setImageUrl}
            />
        </>
    );
};

export default ChatRoom;