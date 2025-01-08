import React, {useRef, useState} from 'react';
import MainTitle from "./MainTitle";

const UserImage = ({ getImage }) => {

    const [userImage, setUserImage] = useState('')
    const [imageValidate, setImageValidate] = useState(false)
    const imageRef = useRef();

    const checkValidate = (flag) => {
        setImageValidate(flag)
    }

    return (
        <>
            <MainTitle title={'프로필 사진을 등록해주세요.'} subText={'(생략 가능)'}/>
        </>
    );
};

export default UserImage;