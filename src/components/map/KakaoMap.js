import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/components/KakaoMap.module.scss'
import {useNavigate} from "react-router-dom";

const KakaoMap = ({search}) => {

    const inputRef = useRef();
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(true)
    const navi = useNavigate();

    useEffect(() => {

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&libraries=services&autoload=false`;
        script.async = true;

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const mapContainer = document.getElementById('map'); // 지도 표시 영역
                    let map;

                    // 현재 위치 가져오기
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const lat = position.coords.latitude; // 위도
                                const lng = position.coords.longitude; // 경도

                                const mapOptions = {
                                    center: new window.kakao.maps.LatLng(lat, lng), // 현재 위치로 중심 좌표 설정
                                    level: 4, // 확대 수준
                                };

                                map = new window.kakao.maps.Map(mapContainer, mapOptions);

                                // 마커 설정
                                const markerPosition = new window.kakao.maps.LatLng(lat, lng); // 마커 위치
                                const marker = new window.kakao.maps.Marker({
                                    position: markerPosition,
                                });
                                marker.setMap(map);
                            },
                            (error) => {
                                console.error('Error getting location:', error);

                                // 위치 정보 사용 거부 시 기본 좌표 설정 (서울)
                                const defaultLat = 37.5665;
                                const defaultLng = 126.9780;

                                const mapOptions = {
                                    center: new window.kakao.maps.LatLng(defaultLat, defaultLng),
                                    level: 4,
                                };

                                map = new window.kakao.maps.Map(mapContainer, mapOptions);

                                // 기본 좌표에 마커 설정
                                const markerPosition = new window.kakao.maps.LatLng(defaultLat, defaultLng);
                                const marker = new window.kakao.maps.Marker({
                                    position: markerPosition,
                                });
                                marker.setMap(map);
                            }
                        );
                    } else {
                        console.error('Geolocation not supported by this browser');

                        // 위치 정보를 지원하지 않는 브라우저일 경우 기본 좌표 설정
                        const defaultLat = 37.5665;
                        const defaultLng = 126.9780;

                        const mapOptions = {
                            center: new window.kakao.maps.LatLng(defaultLat, defaultLng),
                            level: 3,
                        };

                        map = new window.kakao.maps.Map(mapContainer, mapOptions);

                        // 기본 좌표에 마커 설정
                        const markerPosition = new window.kakao.maps.LatLng(defaultLat, defaultLng);
                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition,
                        });
                        marker.setMap(map);
                    }
                });
            } else {
                console.error('Kakao Map API not available');
            }
        };

        script.onerror = () => {
            console.error('Failed to load Kakao Map script');
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const searchHandler = (map) => {
        if (!inputValue.trim()) return;

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        const ps = new window.kakao.maps.services.Places();

        // 지도 범위 가져오기
        const bounds = map.getBounds();
        const options = {
            bounds: bounds, // 현재 지도 범위를 기준으로 검색
        };

        ps.keywordSearch(inputValue, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                // 검색 결과 마커 생성 및 지도 범위 설정
                data.forEach((place) => {
                    const marker = new window.kakao.maps.Marker({
                        map,
                        position: new window.kakao.maps.LatLng(place.y, place.x),
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        infowindow.setContent(
                            `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
                        );
                        infowindow.open(map, marker);
                    });
                });

                // 검색 결과 기준으로 지도 범위 확장
                const bounds = new window.kakao.maps.LatLngBounds();
                data.forEach((place) => {
                    bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
                });
                map.setBounds(bounds);
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                console.log("No places found in the current map bounds.");
            } else {
                console.error("Places search failed:", status);
            }
        }, options); // 검색 옵션으로 현재 지도 범위 전달
    };


    return (
        <>
            {search &&
                <>
                    <input
                        ref={inputRef}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={styles.input}
                        placeholder={`여기서 검색`}
                    />
                    <span
                        className={styles.searchBtn}
                        onClick={() => {
                            const mapContainer = document.getElementById("map");
                            const map = new window.kakao.maps.Map(mapContainer, {
                                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                                level: 4,
                            });
                            searchHandler(map);
                        }}
                    >검색</span>
                </>
            }
            <div
                id="map"
                style={{
                    width: '100%',
                    height: '500px',
                }}
            ></div>
        </>
    );
};

export default KakaoMap;