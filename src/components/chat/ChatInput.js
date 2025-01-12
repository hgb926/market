import React from 'react';
import { GoPlus } from 'react-icons/go';
import { LuSendHorizontal } from 'react-icons/lu';
import { RiEmotionHappyLine } from 'react-icons/ri';
import styles from '../../styles/pages/ChatRoom.module.scss';

const ChatInput = ({ text, onChange, onSend, inputRef }) => (
    <div className={styles.inputContainer}>
        <GoPlus className={styles.plus} />
        <div className={styles.inputWrap}>
            <input
                type="text"
                value={text}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
                ref={inputRef}
                placeholder="메시지 보내기"
            />
            <RiEmotionHappyLine className={styles.emotion} />
        </div>
        <LuSendHorizontal className={styles.send} onClick={onSend} />
    </div>
);

export default ChatInput;