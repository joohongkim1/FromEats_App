/* gloabal kakao */
import React, {useEffect} from 'react';

const MapView = () => {
    useEffect(() => {
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(37.5012291,127.0394741),
            level: 3
        };
        let map = new window.kakao.maps.Map(container, options);
        
        let markerPosition = new window.kakao.maps.LatLng(37.5012291,127.0394741);
        let marker = new window.kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        let iwContent = '<div style="padding:5px;">멀티캠퍼스 역삼</div>';
        let iwRemoveable = true;
        
        let infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
            removable : iwRemoveable
        });

        window.kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        let circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(37.5012291,127.0394741),
            radius: 100,
            strokeWeight: 5, // 선의 두께입니다 
            strokeColor: '#75B8FA', // 선의 색깔입니다
            strokeOpacity: 0.1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#CFE7FF', // 채우기 색깔입니다
            fillOpacity: 0.7  // 채우기 불투명도 입니다   
        });
        circle.setMap(map);

        let mouseoverOption = {
            fillColor: '#F4FAFF',
            fillOpacity: 0.8
        };
        let mouseoutOption = {
            fillColor: '#CFE7FF',
            fillOpacity: 0.7
        };

        window.kakao.maps.event.addListener(circle, 'mouseover', function() {
            circle.setOptions(mouseoverOption);
        });
        window.kakao.maps.event.addListener(circle, 'mouseout', function() {
            circle.setOptions(mouseoutOption);
        });

        window.kakao.maps.event.addListener(circle, 'mousedown', function() {
            // console.log(event);
            let resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '몰래 놀러갔다가 걸리면 큰일나는 곳입니다!';
        });

    }, [])

    return (
        <div>
            <div id="map" style={{width: "100%", height:"500px"}}/>
            <p id="result"></p>
        </div>
    );
};

export default MapView;