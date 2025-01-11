import React, {useEffect, useState} from 'react';
import styles from '../styles/pages/ChatRoom.module.scss'
import {useParams} from "react-router-dom";
import {CHAT_URL} from "../config/host-config";

const ChatRoom = () => {

    const [chatDetail, setChatDetail] = useState({})
    let {id} = useParams();
    console.log(id)

    const getDetail = async () => {

        try {
            const response = await fetch(`${CHAT_URL}/detail?id=${id}`);
            if (response.status === 200) {
                let responseData = await response.json();
                console.log(responseData)
                setChatDetail(responseData)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getDetail()
    }, []);

    return (
        <div>
            ChatRoom
        </div>
    );
};

export default ChatRoom;