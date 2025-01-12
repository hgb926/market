import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/pages/ChatRoom.module.scss'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {CHAT_URL} from "../config/host-config";
import {IoIosArrowBack} from "react-icons/io";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../components/store/ui/UiSlice";
import {GoPlus} from "react-icons/go";
import {LuSendHorizontal} from "react-icons/lu";
import {RiEmotionHappyLine} from "react-icons/ri";
import MyPage from "./MyPage";
import PostsSkeleton from "./PostsSkeleton";

const ChatRoom = () => {

    // 3. 채팅방 이동 후 일단 대화리스트 조회,
    // (roomId 보내서 찾아옴)
    // 4. 대화리스트가 존재하면 setMessages에 저장 후 렌더링


    const [chat, setChat] = useState('')
    let {id: roomId} = useParams();
    const userId = localStorage.getItem('id');
    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))
    let navi = useNavigate();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const inputRef = useRef();

    const getChatInfo = async () => {
        setLoading(true)
        let response = await fetch(`${CHAT_URL}/detail?id=${roomId}`);
        if (response.status === 200) {
            const data = await response.json()
            setChat(data)
            // console.log(data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getChatInfo()
    }, []);

    const getMsgList = async () => {
        if (!roomId) return
        setLoading(true)
        try {
            let response = await fetch(`${CHAT_URL}/chat-detail?id=${roomId}`);
            if (response.status === 200) {
                const data = await response.json();
                // console.log(data)
                setMessages(data)
                setLoading(false)
            }
        } catch (e) {
            console.log(e, '시발')
        }
    };
    useEffect(() => {
        getMsgList();
    }, []);


    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);

        ws.onopen = () => {
            // 방에 참여 요청
            ws.send(
                JSON.stringify({
                    event: "joinRoom",
                    room: roomId,
                })
            );
            console.log(`방 ${roomId}에 참여 요청`);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('data : \n', data)
            // 서버에서 전송된 메시지를 추가
            if (data.event === "serverToClient") {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        room: data.room,
                        text: data.text,
                        writer: data.writer,
                        date: data.date,
                    },
                ]);
                console.log(`갱신된 message : \n${JSON.stringify(messages)}`)
            }
        };

        return () => {
            ws.close(); // 컴포넌트 언마운트 시 연결 닫기
        };
    }, [roomId]);

    const sendMessage = () => {
        if (socket) {
            const message = {
                event: "sendMessage",
                room: roomId,
                text: text,
                writer: userId,
                date: new Date(),
            };
            console.log(`send message : \n${JSON.stringify(message)}`)
            socket.send(JSON.stringify(message));
            setText("");
            inputRef.current.value = "";
        }
    };

    const backHandler = () => {
        navi('/chat')
    }

    useEffect(() => {

    }, [messages]);

    return (
        <>
            {!loading ?
                <>
                    <div className={styles.sellerContainer}>
                        <div className={styles.subContainer}>
                            <IoIosArrowBack
                                onClick={backHandler}
                                className={styles.back}
                            />
                            <p className={styles.chatPartner}>
                                {userId === chat.customerInfo.customerId ?
                                    chat.sellerInfo.sellerNickname :
                                    chat.customerInfo.customerNickname}
                            </p>
                            <HiOutlineDotsVertical className={styles.menu}/>
                        </div>
                    </div>
                    <div className={styles.postContainer}>
                        <div
                            className={styles.postImg}
                            style={{
                                backgroundImage: `url(${chat.postInfo.postImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className={styles.postMetaData}>
                            <div className={styles.topWrap}>
                                <span
                                    className={styles.status}>{chat.postInfo.tradeType === "sell" ? "판매 중" : "나눔"}</span>
                                <p className={styles.title}>{chat.postInfo.postTitle}</p>
                            </div>
                            <div className={styles.price}>{chat.postInfo.postPrice.toLocaleString('ko-KR')}원</div>
                        </div>
                    </div>
                    <div className={styles.chatContainer}>
                        {/*날짜 해야함*/}


                        {messages.map((msg) =>
                            msg.writer !== userId ? (
                                <div className={styles.sellerChat} key={msg.date}>
                                    <div
                                        className={styles.sellerImage}
                                        style={{
                                            backgroundImage: `url(${userId !== chat.customerInfo.customerId ?
                                                chat.sellerInfo.sellerImage :
                                                chat.customerInfo.customerImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div className={styles.sellerText}>{msg.text}</div>
                                    {/*<div className={styles.sellerSendTime}>{msg.date}</div>*/}
                                </div>
                            ) : (
                                <div className={styles.myChat} key={msg.date}>
                                    {/*<div className={styles.myTime}>{msg.date}</div>*/}
                                    <div className={styles.myText}>{msg.text}</div>
                                </div>
                            )
                        )}

                    </div>
                    <div className={styles.inputContainer}>
                        <GoPlus className={styles.plus}/>
                        <div className={styles.inputWrap}>
                            <input
                                type={'text'}
                                onChange={(e) => setText(e.target.value)}
                                className={styles.input}
                                ref={inputRef}
                                placeholder={'메시지 보내기'}
                            />
                            <RiEmotionHappyLine className={styles.emotion}/>
                        </div>
                        <LuSendHorizontal className={styles.send} onClick={sendMessage}/>
                    </div>
                </> : <PostsSkeleton/>}
        </>

    );
};

export default ChatRoom;