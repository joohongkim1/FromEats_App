import React, { useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps"; // 패키지 불러오기

function openNaver() {
  const newWindow = window.open("https://map.naver.com/v5/directions");
}
function NaverMapAPI(props) {
  const lat2 = props.lat * 1;
  const long2 = props.long * 1;
  const navermaps = window.naver.maps;
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>지도</h3>
      <div style={{ marginLeft: "5%", marginBottom: "5px", marginTop: "10px" }}>
        <img
          src="https://image.flaticon.com/icons/svg/1076/1076323.svg"
          alt=""
          style={{ width: "20px", height: "20px" }}
        />
        <span style={{}}>{props.address}</span>
      </div>
      <div
        style={{
          width: "330px",
          height: "300px",
          textAlign: "center",
          marginLeft: "3.5%",
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        <NaverMap
          mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
          style={{
            width: "100%", // 네이버지도 가로 길이
            height: "100%", // 네이버지도 세로 길이
            borderRadius: "10px 10px 10px 10px",
          }}
          defaultCenter={{ lat: lat2, lng: long2 }} // 지도 초기 위치
          defaultZoom={14} // 지도 초기 확대 배율
        >
          <Marker
            key={1}
            position={new navermaps.LatLng(lat2, long2)}
            animation={2}
            onClick={openNaver}
          ></Marker>
        </NaverMap>
      </div>
    </div>
  );
}

function MapContent(props) {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={"e616qkrn9m"} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI lat={props.lat} long={props.long} address={props.address} />
    </RenderAfterNavermapsLoaded>
  );
}

export default MapContent;
