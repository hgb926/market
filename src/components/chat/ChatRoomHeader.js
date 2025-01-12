import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import styles from '../../styles/pages/ChatRoom.module.scss'

const ChatRoomHeader = ({ chat, userId, onBack }) => (
    <div className={styles.sellerContainer}>
        <div className={styles.subContainer}>
            <IoIosArrowBack onClick={onBack} className={styles.back} />
            <p className={styles.chatPartner}>
                {userId === chat.customerInfo.customerId
                    ? chat.sellerInfo.sellerNickname
                    : chat.customerInfo.customerNickname}
            </p>
            <HiOutlineDotsVertical className={styles.menu} />
        </div>
    </div>
);

export default ChatRoomHeader;