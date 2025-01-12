import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/pages/ChatRoom.module.scss'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {CHAT_URL} from "../config/host-config";
import {IoIosArrowBack} from "react-icons/io";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {io} from "socket.io-client";
import {uiActions} from "../components/store/ui/UiSlice";
import {GoPlus} from "react-icons/go";
import {LuSendHorizontal} from "react-icons/lu";
import {RiEmotionHappyLine} from "react-icons/ri";

const ChatRoom = () => {

    const location = useLocation();
    const { chat } = location.state || {}
    console.log(chat)
    let userData = useSelector(state => state.userInfo.userData);
    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))
    let navi = useNavigate();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([
        {writer: '', text: '', date: ''}
    ])
    const [text, setText] = useState('')
    const inputRef = useRef();

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);

        // 서버로부터 메시지를 수신
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // 이벤트 타입이 'serverToClient'일 경우 처리
            if (data.event === 'serverToClient') {
                console.log('서버로부터 수신된 데이터:', data);
                setMessages((prevMessages) => [...prevMessages, data.message]);
            }
        };

        // 컴포넌트 언마운트 시 WebSocket 연결 닫기
        return () => {
            ws.close();
        };
    }, []);

    // 메시지 전송 핸들러
    const sendMessage = () => {
        if (socket) {
            const message = {
                event: 'clientToServer',
                writer: `${userData.id}`,
                text: `${text}`,
                date: new Date()
            };
            socket.send(JSON.stringify(message));
            // setMessages(prev => [...prev, newMessage]); // 로컬 메시지 업데이트
            setText(''); // 입력 초기화
        }
    };

    const backHandler = () => {
     navi('/chat')
    }


    return (
        <>
             <>
                <div className={styles.sellerContainer}>
                    <div className={styles.subContainer}>
                        <IoIosArrowBack
                            onClick={backHandler}
                            className={styles.back}
                        />
                        <p className={styles.chatPartner}>
                            {userData.id === chat.customerInfo.customerId ?
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
                            <span className={styles.status}>{chat.postInfo.tradeType === "sell" ? "판매 중" : "나눔"}</span>
                            <p className={styles.title}>{chat.postInfo.postTitle}</p>
                        </div>
                        <div className={styles.price}>{chat.postInfo.postPrice.toLocaleString('ko-KR')}원</div>
                    </div>
                </div>
                <div className={styles.chatContainer}>
                    {/*날짜 해야함*/}
                    <div className={styles.sellerChat}>
                        <div
                            className={styles.sellerImage}
                            style={{
                            backgroundImage: `url(${userData._id === chat.customerInfo.customerId ?
                                chat.sellerInfo.sellerImage :
                                chat.customerInfo.customerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>
                        <div className={styles.sellerText}>사양이 어떻게 되는건가요?</div>
                        <div className={styles.sellerSendTime}>오후 8:51</div>
                    </div>
                    <div className={styles.myChat}>
                        <div className={styles.myTime}>오후 8:54</div>
                        <div className={styles.myText}>몰라요</div>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <GoPlus className={styles.plus}/>
                    <div className={styles.inputWrap}>
                        <input type={'text'}  onChange={(e) => setText(e.target.value)} className={styles.input} ref={inputRef} placeholder={'메시지 보내기'}/>
                        <RiEmotionHappyLine className={styles.emotion}/>
                    </div>
                    <LuSendHorizontal className={styles.send} onClick={sendMessage}/>
                </div>
            </>
        </>
    );
};

export default ChatRoom;