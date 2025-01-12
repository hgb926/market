import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/pages/ChatRoom.module.scss'
import {useNavigate, useParams} from "react-router-dom";
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

    const [chatDetail, setChatDetail] = useState({})
    const [loading, setLoading] = useState(true);
    let {id} = useParams();
    let userData = useSelector(state => state.userInfo.userData);
    const dispatch = useDispatch();
    dispatch(uiActions.changeRenderStatus(false))
    let navi = useNavigate();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([{clientId: '', text: ''}])
    const [message, setMessage] = useState('')
    const inputRef = useRef();

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);

        ws.onmessage = e => {
            const messageData = JSON.parse(e.data);
            setMessages(prev => [...prev, messageData])
        }

        return () => {
            ws.close()
        }
    }, []);

    const getDetail = async () => {

        setLoading(true)

        try {
            const response = await fetch(`${CHAT_URL}/detail?id=${id}`);
            if (response.status === 200) {
                let responseData = await response.json();
                setChatDetail(responseData)
                setLoading(false)
            }
        } catch (e) {
            setLoading(true)
            console.log(e)
        }
    }
    useEffect(() => {
        getDetail()
    }, []);

    const backHandler = () => {
     navi('/chat')
    }

    const sendMessage = () => {
        if (socket && message) {
            console.log(message)
            const newMessage = { text: message, clientId: userData.id }; // message를 newMessage로 변경
            console.log(newMessage);
            socket.send(JSON.stringify(newMessage));
            setMessages(prev => [...prev, newMessage]); // 로컬 메시지 업데이트
            setMessage(''); // 입력 초기화
        }
    };

    return (
        <>
            {loading ? <div></div> : <>
                <div className={styles.sellerContainer}>
                    <div className={styles.subContainer}>
                        <IoIosArrowBack
                            onClick={backHandler}
                            className={styles.back}
                        />
                        <p className={styles.chatPartner}>
                            {userData._id === chatDetail.customerInfo.customerId ?
                                chatDetail.sellerInfo.sellerNickname :
                                chatDetail.customerInfo.customerNickname}
                        </p>
                        <HiOutlineDotsVertical className={styles.menu}/>
                    </div>
                </div>
                <div className={styles.postContainer}>
                    <div
                        className={styles.postImg}
                        style={{
                            backgroundImage: `url(${chatDetail.postInfo.postImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    ></div>
                    <div className={styles.postMetaData}>
                        <div className={styles.topWrap}>
                            <span className={styles.status}>{chatDetail.postInfo.tradeType === "sell" ? "판매 중" : "나눔"}</span>
                            <p className={styles.title}>{chatDetail.postInfo.postTitle}</p>
                        </div>
                        <div className={styles.price}>{chatDetail.postInfo.postPrice.toLocaleString('ko-KR')}원</div>
                    </div>
                </div>
                <div className={styles.chatContainer}>
                    {/*날짜 해야함*/}
                    <div className={styles.sellerChat}>
                        <div
                            className={styles.sellerImage}
                            style={{
                            backgroundImage: `url(${userData._id === chatDetail.customerInfo.customerId ?
                                chatDetail.sellerInfo.sellerImage :
                                chatDetail.customerInfo.customerImage})`,
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
                        <input type={'text'}  onChange={(e) => setMessage(e.target.value)} className={styles.input} ref={inputRef} placeholder={'메시지 보내기'}/>
                        <RiEmotionHappyLine className={styles.emotion}/>
                    </div>
                    <LuSendHorizontal className={styles.send} onClick={sendMessage}/>
                </div>
            </>}
        </>
    );
};

export default ChatRoom;