/* gloabal kakao */
import React, {useEffect} from 'react';

const MapView3 = ({stores, loading, area}) => {
    let curStores = {stores}.stores;
    let curLocation = {area}.area;  //  지역 받아오기
    useEffect(() => {
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(37.5012767241426,127.039600248343),    //  역삼 멀티캠퍼스 기준
            // center : new window.kakao.maps.LatLng(37.5324310391314, 126.990582345331),  //  용산구청 기준
            level: 8
        };  
        let map = new window.kakao.maps.Map(container, options);
        map.setDraggable(true);
        
        // let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        // let imageSrc1 = "https://img.icons8.com/color/30/000000/cafe.png";
        // let imageSrc = new Array()
        // imageSrc[0] = "https://img.icons8.com/officel/30/000000/weber.png"; //  고기
        // imageSrc[1] = "https://img.icons8.com/color/30/000000/sashimi.png";  //  돈가스*회*일식
        // imageSrc[2] = "https://img.icons8.com/plasticine/30/000000/pizza.png";   //  피자*파스타*스테이크
        // imageSrc[3] = "https://img.icons8.com/color/30/000000/rice-bowl.png";   //  한식
        // imageSrc[4] = "https://img.icons8.com/flat_round/30/000000/pig--v1.png"; //  족발*보쌈
        // imageSrc[5] = "https://img.icons8.com/officel/30/000000/chicken.png";   //  치킨
        // imageSrc[6] = "https://img.icons8.com/plasticine/100/000000/hamburger.png"; //  버거
        // imageSrc[7] = "https://img.icons8.com/color/30/000000/asian-hat.png";   //  아시안요리
        // imageSrc[8] = "https://img.icons8.com/color/30/000000/beer-bottle.png"; //  술
        // imageSrc[9] = "https://img.icons8.com/emoji/30/000000/man-with-chinese-cap.png";    //  중식
        // imageSrc[10] = "https://img.icons8.com/ios-filled/30/000000/sleeping-mat.png";  //  분식
        // imageSrc[11] = "https://img.icons8.com/color/30/000000/cafe.png";   //  카페
        // let imageSize = new window.kakao.maps.Size(30, 30)
        // let imageOption = {offset: new window.kakao.maps.Point()}
        
        // 마커 클러스터러를 생성합니다.
        let clusterer = new window.kakao.maps.MarkerClusterer({
            map: map,   //  마커들을 클러스터러로 관리하고 표시할 지도 객체
            averageCenter: true,    //  클러스터러에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 5 //  클러스터 할 최소 지도 레벨
        });

        for(let i = 0; i<curStores.length; i++){
            let curStore = curStores[i];
            let markerPosition = new window.kakao.maps.LatLng(curStore.latitude, curStore.longitude);
            // console.log(markerPosition); //  위도, 경도 잘 나오는지 확인용
            // 마커 이미지 설정
            // let cateNum;
            // if(curStore.big_cate === "고기"){cateNum = 0;}
            // else if(curStore.big_cate === "돈가스*회*일식"){cateNum = 1;}
            // else if(curStore.big_cate === "피자*파스타*스테이크"){cateNum = 2;}
            // else if(curStore.big_cate === "한식"){cateNum = 3;}
            // else if(curStore.big_cate === "족발*보쌈"){cateNum = 4;}
            // else if(curStore.big_cate === "치킨"){cateNum = 5;}
            // else if(curStore.big_cate === "버거"){cateNum = 6;}
            // else if(curStore.big_cate === "아시안요리"){cateNum = 7;}
            // else if(curStore.big_cate === "술"){cateNum = 8;}
            // else if(curStore.big_cate === "중식"){cateNum = 9;}
            // else if(curStore.big_cate === "분식"){cateNum = 10;}
            // else if(curStore.big_cate === "카페"){cateNum = 11;}
            
            // let markerImage = new window.kakao.maps.MarkerImage(imageSrc[cateNum], imageSize, imageOption);
            // 마커를 생성합니다
            let marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markerPosition, // 마커를 표시할 위치
                title : curStore.store_name // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                // image: markerImage
            });
            // 여기부턴 마커 클릭했을 때 나올 것들
            let iwContent = `<div style="margin:5px; width: 100%; max-width: 300px">
                            <strong>${curStore.store_name}</strong><br/>
                            <img src=${curStore.img_url} alt="가게 사진" height="100" width="auto"><br/>
                            ${curStore.detail_lifestyle}<br/>
                            주소 : ${curStore.address}<br/>평점 : ${curStore.mean_score.toFixed(2)}<br/>
                            <a href="https://map.kakao.com/link/map/${curStore.store_name},${curStore.latitude},${curStore.longitude}" target="_blank">카카오맵 새창으로 이동</a>
                            </div>`
            let iwRemoveable = true;

            let infoWindow = new window.kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });
            
            window.kakao.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(map, marker);
            });
            clusterer.addMarker(marker);
        }

        // console.log("---MapView3---")
        // console.log(curLocation);
        // console.log({area}.area);

        // 중심 장소 정하기
        if(curLocation !== '' && curLocation.length !== 0){
            let geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(curLocation, function(result, status) {
                if(status === window.kakao.maps.services.Status.OK) {
                    let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(coords);
                }
            })
        }

        /*
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
        */
    }, [stores])
    // if(!loading) {
    //     console.log("---- MapView3에서 부름 ----");
    //     console.log({stores}.stores[0]);
    //     console.log({stores}.stores);
    //     // console.log(curStores.address);
    //     // console.log(curStores[0]);
    //     // console.log(curStores.length);
    //     // console.log(curStores[0].latitude)
    //     // console.log(curStores[0].longitude)
    // }
    // console.log({stores});
    
    return (
        <div>
            <div id="map" style={{width: "95%", height:"400px", margin:"auto"}}/>
        </div>
    );
};

export default MapView3;