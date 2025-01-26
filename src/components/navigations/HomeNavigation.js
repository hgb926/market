import React, {useState, useEffect} from 'react';
import styles from '../../styles/components/HomeNavigation.module.scss';
import {IoIosArrowDown, IoMdSearch} from 'react-icons/io';
import {RxHamburgerMenu} from 'react-icons/rx';
import {LuBell} from 'react-icons/lu';
import {IoSettingsOutline} from 'react-icons/io5';
import HomeNavigationSkeleton from '../../skeleton/HomeNavigationSkeleton';
import NoticeModal from "../modals/NoticeModal";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


const HomeNavigation = ({mainText, arrow, bell, hamburger, search, setting}) => {
    const [loading, setLoading] = useState(true);
    const [openNotice, setOpenNotice] = useState(false);
    const {pathname} = useLocation();
    const isNewNotice = useSelector(state => state.sse.isNewNotice);
    const navi = useNavigate();

    useEffect(() => {

    }, [isNewNotice]);

    useEffect(() => {
        if (pathname === '/') {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 300);

            return () => clearTimeout(timer);
        } else {
            setLoading(false); // 다른 경로에서는 로딩 상태를 바로 false로 설정
        }
    }, [pathname]);

    if (loading) return <HomeNavigationSkeleton/>;



    return (
        <>
            <div className={styles.container}>
                <div className={styles.town}>
                    {mainText}
                    {arrow && <IoIosArrowDown className={styles.arrow} />}
                </div>
                <div className={styles.menus}>
                    {hamburger && <RxHamburgerMenu />}

                    {search && (
                        <IoMdSearch onClick={() => navigate('search')} />
                    )}

                    {bell && (
                        <>
                            <LuBell onClick={() => setOpenNotice(!openNotice)} />
                            {isNewNotice && <div className={styles.circle}></div>}
                        </>
                    )}

                    {setting && (
                        <IoSettingsOutline onClick={() => navigate('/setting')} />
                    )}
                </div>
            </div>

            {openNotice && (
                <NoticeModal setOpenNotice={setOpenNotice} />
            )}
        </>
    );
};

export default HomeNavigation;