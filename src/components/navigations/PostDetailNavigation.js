import React, {useState} from 'react';
import styles from '../../styles/components/PostDetailNavigation.module.scss'
import {IoIosArrowBack} from "react-icons/io";
import {MdIosShare} from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";
import {HiOutlineHome} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../store/ui/UiSlice";
import MenuListModal from "../MenuListModal";


const PostDetailNavigation = ({ writerId, postId }) => {

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false)

    const navi = useNavigate();
    const homeHandler = () => {
        dispatch(uiActions.changeRenderStatus(true))
        navi('..')
    }

    const clipHandler = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(res => {
            alert(`${url}\n복사완료`)
        })
    }


    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.flex}>
                    <IoIosArrowBack onClick={homeHandler}/>
                    <HiOutlineHome onClick={homeHandler}/>
                </div>
                <div className={styles.flex}>
                    <MdIosShare onClick={clipHandler}/>
                    <BsThreeDotsVertical onClick={() => setOpenModal(!openModal)}/>
                </div>
            </div>
            {openModal &&
                <MenuListModal
                    setOpenModal={setOpenModal}
                    writerId={writerId}
                    postId={postId}
                />
            }
        </>
    );
};

export default PostDetailNavigation;