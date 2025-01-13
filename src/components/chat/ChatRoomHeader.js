import React, {useEffect, useState} from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import {HiOutlineDotsVertical} from 'react-icons/hi';
import styles from '../../styles/pages/ChatRoom.module.scss'
import ChatMenuDropDown from "./ChatMenuDropUp";

const ChatRoomHeader = ({chat, userId, onBack}) => {

    const [menuDrop, setMenuDrop] = useState(false)



    return (<div className={styles.sellerContainer}>
            <div className={styles.subContainer}>
                <IoIosArrowBack onClick={onBack} className={styles.back}/>
                <p className={styles.chatPartner}>
                    {userId === chat.customerInfo.customerId
                        ? chat.sellerInfo.sellerNickname
                        : chat.customerInfo.customerNickname}
                </p>
                <HiOutlineDotsVertical className={styles.menu} onClick={() => setMenuDrop(!menuDrop)}/>
                {menuDrop && <ChatMenuDropDown setMenuDrop={setMenuDrop}/>}
            </div>
        </div>
    );
}

export default ChatRoomHeader;