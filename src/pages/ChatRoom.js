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
                console.log('서버로부터 수신된 데이터:', data.message);
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
            const message = { event: 'clientToServer', text: `${text}` };
            socket.send(JSON.stringify(message));
            // setMessages(prev => [...prev, newMessage]); // 로컬 메시지 업데이트
            setText(''); // 입력 초기화
        }
    };


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
                            {userData.id === chatDetail.customerInfo.customerId ?
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
                        <input type={'text'}  onChange={(e) => setText(e.target.value)} className={styles.input} ref={inputRef} placeholder={'메시지 보내기'}/>
                        <RiEmotionHappyLine className={styles.emotion}/>
                    </div>
                    <LuSendHorizontal className={styles.send} onClick={sendMessage}/>
                </div>
            </>}
        </>
    );
};

export default ChatRoom;