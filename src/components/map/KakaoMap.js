import React, { useEffect } from 'react';

const KakaoMap = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&autoload=false`;
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

    return (
        <div
            id="map"
            style={{
                width: '100%',
                height: '400px',
            }}
        ></div>
    );
};

export default KakaoMap;