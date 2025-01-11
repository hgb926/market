import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/ChatRoom.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {CHAT_URL} from "../config/host-config";
import {IoIosArrowBack} from "react-icons/io";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {useSelector} from "react-redux";

const ChatRoom = () => {

    const [chatDetail, setChatDetail] = useState({})
    const [loading, setLoading] = useState(true);
    let {id} = useParams();
    let userData = useSelector(state => state.userInfo.userData);
    console.log(id)
    let navi = useNavigate();

    const getDetail = async () => {

        setLoading(true)

        try {
            const response = await fetch(`${CHAT_URL}/detail?id=${id}`);
            if (response.status === 200) {
                let responseData = await response.json();
                console.log(responseData)
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
     navi('chat')
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
                        <div className={styles.status}>{chatDetail.postInfo.tradeType === "sell" ? "판매 중" : "나눔"}</div>
                        <div className={styles.price}>{chatDetail.postInfo.postPrice.toLocaleString('ko-KR')}원</div>
                    </div>
                    <p className={styles.title}>{chatDetail.postInfo.postTitle}</p>
                </div>
                <div className={styles.chatContainer}>
                    <p>ㅎㅇ</p>
                    <p>ㅎㅇ</p>
                </div>
            </>}
        </>
    );
};

export default ChatRoom;