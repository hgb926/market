import AWS from 'aws-sdk';
import React from 'react';
import {GoPlus} from 'react-icons/go';
import {LuSendHorizontal} from 'react-icons/lu';
import {RiEmotionHappyLine} from 'react-icons/ri';
import styles from '../../styles/pages/ChatRoom.module.scss';
import {LiaTimesSolid} from "react-icons/lia";

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();
// 업로드만 해보자

const ChatInput = ({text, onChange, onSend, image, setImage, inputRef, imageRef, setImageUrl}) => {

    // Enter 키 핸들러 함수
    const enterHandler = (e) => {
        if (e.key === 'Enter' && text.trim()) {
            onSend();
        }
    };

    const uploadImageToS3 = async (file) => {
        const params = {
            Bucket: process.env.REACT_APP_AWS_BUCKET_NAME, // S3 버킷 이름
            Key: `chat-images/${Date.now()}-${file.name}`, // 고유한 파일명
            Body: file,
            ContentType: file.type,
        };

        try {
            const uploadResult = await s3.upload(params).promise();
            return uploadResult.Location;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('이미지 업로드 실패');
        }
    };


    // 파일 선택 트리거
    const triggerFileSelect = () => {
        imageRef.current.click();
    };

    const fileHandler = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // 로컬 미리보기 이미지 설정
        const localImageUrl = URL.createObjectURL(file);
        setImage(localImageUrl);

        try {
            const uploadedImageUrl = await uploadImageToS3(file);  // 비동기 함수 실행 및 결과 대기
            setImageUrl(uploadedImageUrl);
            console.log("Uploaded image URL:", uploadedImageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    return (
        <div className={styles.inputContainer}>
            <GoPlus className={styles.plus} onClick={triggerFileSelect}/>
            <input
                type="file"
                ref={imageRef}
                style={{display: 'none'}}
                onChange={fileHandler}
                accept="image/*"
            />
            <div className={`${styles.inputWrap} ${image && styles.containImage}`}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyUp={enterHandler} // Enter 핸들러 연결
                    className={styles.input}
                    ref={inputRef}
                    placeholder={`${!image ? '메시지 보내기' : ''}`}
                />
                {image &&
                    <div
                        className={styles.image}
                        style={{backgroundImage: `url(${image})`}}
                    >
                        <LiaTimesSolid
                            className={styles.cancel}
                            onClick={() => setImage('')}
                        />
                    </div>}
                {!image && <RiEmotionHappyLine className={styles.emotion}/>}
            </div>
            <LuSendHorizontal
                className={`${styles.send} ${(inputRef.current?.value || imageRef.current?.value) && styles.active}`}
                onClick={onSend}
            />
        </div>
    );
};

export default ChatInput;