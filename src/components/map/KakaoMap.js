import React, { useEffect } from 'react';

const KakaoMap = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
            console.log('Kakao Map Script Loaded');
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    console.log('Kakao Map API Loaded');
                    const mapContainer = document.getElementById('map');
                    const mapOptions = {
                        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
                        level: 4, // 확대 수준
                    };
                    const map = new window.kakao.maps.Map(mapContainer, mapOptions);

                    const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780); // 마커 위치
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });
                    marker.setMap(map);
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