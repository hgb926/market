import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/KakaoMap.module.scss';

const KakaoMap = ({ search }) => {
    const mapRef = useRef(null); // 지도 컨테이너 참조
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const loadKakaoMap = () => {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&libraries=services&autoload=false`;
            script.async = true;

            script.onload = () => {
                if (window.kakao && window.kakao.maps) {
                    window.kakao.maps.load(() => initializeMap());
                } else {
                    console.error('Kakao Map API not available');
                }
            };

            script.onerror = () => console.error('Failed to load Kakao Map script');
            document.head.appendChild(script);

            return () => document.head.removeChild(script); // Clean up script
        };

        const initializeMap = () => {
            if (!mapRef.current) return;

            const mapOptions = {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 서울 좌표
                level: 4, // 지도 확대 수준
            };

            const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

            // 현재 위치 기반 지도 설정
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const currentPos = new window.kakao.maps.LatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        map.setCenter(currentPos);

                        new window.kakao.maps.Marker({
                            position: currentPos,
                            map: map,
                        });
                    },
                    () => console.error('Unable to retrieve your location')
                );
            }

            // Search 기능이 있다면 핸들러를 바인딩
            if (search) {
                const searchHandler = () => handleSearch(map);
                inputRef.current?.addEventListener('click', searchHandler);

                return () => inputRef.current?.removeEventListener('click', searchHandler);
            }
        };

        loadKakaoMap();
    }, [search]);

    const handleSearch = (map) => {
        if (!inputValue.trim() || !map) return;

        const ps = new window.kakao.maps.services.Places();
        const bounds = map.getBounds();
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        ps.keywordSearch(
            inputValue,
            (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const newBounds = new window.kakao.maps.LatLngBounds();

                    data.forEach((place) => {
                        const marker = new window.kakao.maps.Marker({
                            map,
                            position: new window.kakao.maps.LatLng(place.y, place.x),
                        });

                        window.kakao.maps.event.addListener(marker, 'click', () => {
                            infowindow.setContent(
                                `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
                            );
                            infowindow.open(map, marker);
                        });

                        newBounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
                    });

                    map.setBounds(newBounds);
                } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                    console.log('No results found');
                } else {
                    console.error('Search failed:', status);
                }
            },
            { bounds }
        );
    };

    return (
        <>
            {search && (
                <>
                    <input
                        type="text"
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={styles.input}
                        placeholder="검색어를 입력하세요"
                    />
                    <span className={styles.searchBtn} onClick={() => handleSearch(mapRef.current)}>
                        검색
                    </span>
                </>
            )}
            <div
                id="map"
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '500px',
                }}
            ></div>
        </>
    );
};

export default KakaoMap;