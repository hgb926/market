import React from 'react';
import styles from '../styles/pages/MyPage.module.scss'
import HomeNavigation from "../components/navigations/HomeNavigation";
import {useSelector} from "react-redux";
import {SlArrowRight} from "react-icons/sl";
import {CiHeart} from "react-icons/ci";
import {RiPagesLine} from "react-icons/ri";
import {IoBasketOutline} from "react-icons/io5";
import {IoMdGift} from "react-icons/io";
import {HiSpeakerphone} from "react-icons/hi";
import {Link, Outlet, useLocation} from "react-router-dom";


const MyPage = () => {

    const userData = useSelector(state => state.userInfo.userData);

    const location = useLocation();
    // 자식 경로가 있는지 확인
    const hasChildRoute = location.pathname !== '/info';

    return (

        <div className={styles.container}>
            {!hasChildRoute &&
                <>
                    <HomeNavigation
                        mainText={'나의 Market'}
                        setting={true}
                    />
                    <div className={styles.margin}></div>
                    <div className={styles.section}>
                        {/* 밑 div 클릭시 프로필로 이동*/}
                        <div className={styles.userInfoContainer}>
                            <div className={styles.userImage} style={{
                                backgroundImage: `url(${userData.profileUrl})`,
                            }}/>
                            <p className={styles.nickname}>{userData.nickname}</p>
                            <SlArrowRight className={styles.arrow}/>
                        </div>
                        <div className={styles.paymentContainer}>
                            <div className={styles.paymentTop}>
                                <p>pay</p>
                                <p className={styles.point}>0원
                                    <SlArrowRight style={{fontSize: '0.8rem', marginLeft: "5px"}}/>
                                </p>
                            </div>
                            <div className={styles.paymentOptions}>
                                <div>충전</div>
                                <div>송금</div>
                                <div>카드</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <p className={styles.category}>나의 거래</p>
                        <Link to={'liked'} className={styles.menuContainer}>
                            <div className={styles.menuSubContainer}>
                                <CiHeart className={styles.icon}/>
                                <div className={styles.menu}>관심목록</div>
                            </div>
                            <SlArrowRight className={styles.arrow}/>
                        </Link>
                        <div className={styles.menuContainer}>
                            <div className={styles.menuSubContainer}>
                                <RiPagesLine className={styles.icon}/>
                                <div className={styles.menu}>판매내역</div>
                            </div>
                            <SlArrowRight className={styles.arrow}/>
                        </div>
                        <div className={styles.menuContainer}>
                            <div className={styles.menuSubContainer}>
                                <IoBasketOutline className={styles.icon}/>
                                <div className={styles.menu}>구매내역</div>
                            </div>
                            <SlArrowRight className={styles.arrow}/>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <p className={styles.category}>마켓 소식</p>
                        <div className={styles.menuContainer}>
                            <div className={styles.menuSubContainer}>
                                <IoMdGift className={styles.icon}/>
                                <div className={styles.menu}>진행중인 이벤트</div>
                            </div>
                            <SlArrowRight className={styles.arrow}/>
                        </div>
                        <div className={styles.menuContainer}>
                            <div className={styles.menuSubContainer}>
                                <HiSpeakerphone className={styles.icon}/>
                                <div className={styles.menu}>공지사항</div>
                            </div>
                            <SlArrowRight className={styles.arrow}/>
                        </div>
                    </div>
                </>}
            <Outlet/>
        </div>
    );
};

export default MyPage;