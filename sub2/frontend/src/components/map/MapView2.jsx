/* gloabal kakao */
import React, { useEffect } from "react";

const MapView2 = ({ stores, loading, meetPlace }) => {
  let curStores = { stores }.stores;
  let curLocation = { meetPlace }.meetPlace; //  지역 받아오기
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(37.5012767241426, 127.039600248343), //  역삼 멀티캠퍼스 기준
      // center : new window.kakao.maps.LatLng(37.5324310391314, 126.990582345331),  //  용산구청 기준
      level: 8,
    };
    let map = new window.kakao.maps.Map(container, options);
    map.setDraggable(true);

    // 마커 클러스터러를 생성합니다.
    let clusterer = new window.kakao.maps.MarkerClusterer({
      map: map, //  마커들을 클러스터러로 관리하고 표시할 지도 객체
      averageCenter: true, //  클러스터러에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, //  클러스터 할 최소 지도 레벨
    });

    for (let i = 0; i < curStores.length; i++) {
      let curStore = curStores[i];
      let markerPosition = new window.kakao.maps.LatLng(
        curStore.latitude,
        curStore.longitude
      );
      // console.log(markerPosition); //  위도, 경도 잘 나오는지 확인용

      // 마커를 생성합니다
      let marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerPosition, // 마커를 표시할 위치
        title: curStore.store_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
      // 여기부턴 마커 클릭했을 때 나올 것들
      let iwContent = `<div style="margin:5px; width: 100%; max-width: 300px">
                            <strong>${curStore.store_name}</strong><br/>
                            <img src=${
                              curStore.img_url
                            } alt="가게 사진" height="100" width="auto"><br/>
                            ${curStore.detail_lifestyle}<br/>
                            주소 : ${
                              curStore.address
                            }<br/>평점 : ${curStore.mean_score.toFixed(2)}<br/>
                            <a href="https://map.kakao.com/link/map/${
                              curStore.store_name
                            },${curStore.latitude},${
        curStore.longitude
      }" target="_blank">카카오맵 새창으로 이동</a>
                            </div>`;
      let iwRemoveable = true;

      let infoWindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map, marker);
      });
      clusterer.addMarker(marker);
    }

    // console.log("---MapView2---")
    // console.log(curLocation);
    // console.log({meetPlace}.meetPlace);
    // 중심 장소 정하기
    if (curLocation !== undefined) {
      if (curLocation !== "" && curLocation.length !== 0) {
        let geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(curLocation, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(coords);
          }
        });
      }
    }
  }, [stores]);

  return (
    <div>
      <div id="map" style={{ width: "95%", height: "400px", margin: "auto" }} />
    </div>
  );
};

export default MapView2;
