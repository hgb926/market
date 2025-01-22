import React, {useRef, useState} from 'react';
import { GoPlus } from 'react-icons/go';
import { LuSendHorizontal } from 'react-icons/lu';
import { RiEmotionHappyLine } from 'react-icons/ri';
import styles from '../../styles/pages/ChatRoom.module.scss';

const ChatInput = ({ text, onChange, onSend, inputRef, imageRef }) => {

    const [imageUrl, setImageUrl] = useState('')
    // Enter 키 핸들러 함수
    const enterHandler = (e) => {
        if (e.key === 'Enter' && text.trim()) {
            onSend();
        }
    };

    // 파일 선택 트리거
    const triggerFileSelect = () => {
        imageRef.current.click();
    };

    const fileHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // input에 넣을 이미지
        const imageUrl = URL.createObjectURL(file);

        // getImage(file); // 이미지 파일 객체 전달
        // setUserImage(imageUrl);
        setImageUrl(imageUrl)
    };

    return (
        <div className={styles.inputContainer}>
            <GoPlus className={styles.plus} onClick={triggerFileSelect}/>
            <input
                type="file"
                ref={imageRef}
                style={{ display: 'none' }}
                onChange={fileHandler}
                accept="image/*"
            />
            <div className={styles.inputWrap}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyUp={enterHandler} // Enter 핸들러 연결
                    className={styles.input}
                    ref={inputRef}
                    placeholder="메시지 보내기"
                />
                {/*<div*/}
                {/*    className={styles.image}*/}
                {/*/>*/}
                <RiEmotionHappyLine className={styles.emotion} />
            </div>
            <LuSendHorizontal
                className={`${styles.send} ${(inputRef.current.value || imageRef.current.value) && styles.active}`}
                onClick={onSend}
            />
        </div>
    );
};

export default ChatInput;