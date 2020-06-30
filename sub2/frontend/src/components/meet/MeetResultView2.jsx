/* gloabal kakao */
import React, { useState, useEffect } from "react";
import HTTP from "../../modules/api/client";
import MapView2 from "../map/MapView2";
import styled from "styled-components";

const MeetResultBlock = styled.div`
  font-family: "Recipe Korea";
`;

const MeetResultView2 = ({ sendArea, sendLife, sendString, value }) => {
  const [dataString, setDataString] = useState("");
  const [area, setArea] = useState([]);
  const [lifes, setLifes] = useState([]);
  const [stores, setStores] = useState({});
  const [loading, setLoading] = useState(false);
  const [storeNum, setStoreNum] = useState(0);
  const [meetPlace, setMeetPlace] = useState([]);
  const [centerPlace, setCenterPlace] = useState([]);
  const [maxPlace, setMaxPlace] = useState([]);
  const [qString, setQString] = useState("");

  // let storenum = 0;
  useEffect(() => {
    // console.log("--- MeetResultView2 useEffect 부분 ---");
    // console.log("받은 지역 : " + {sendArea}.sendArea)
    // console.log("받은 라이프 : " + {sendLife}.sendLife)
    // console.log("받은 스트링 : " + {sendString}.sendString)
    setArea({ sendArea }.sendArea);
    setLifes({ sendLife }.sendLife);
    setDataString({ sendString }.sendString);
    // console.log("Lifes : " + lifes);
  }, [sendArea, sendLife, sendString]);

  useEffect(() => {
    // console.log("--- 지역이 변경되어 중심지를 찾습니다. ---");
    findCenter();
  }, [area]);

  useEffect(() => {
    findMax();
  }, [area, dataString]);

  // useEffect(() => {
  //     console.log("--- 중심지 자치구 ---");
  //     console.log(centerPlace);
  //     console.log("--- 최대지 자치구 ---")
  //     console.log(maxPlace);
  //     findPlace();
  // }, [centerPlace, maxPlace])

  useEffect(() => {
    if ({ value }.value === "center") {
      if (centerPlace !== undefined) {
        if (centerPlace !== "" && centerPlace.length !== 0) {
          let query = dataString + centerPlace;
          // console.log(query);
          setQString(query);
          setMeetPlace(centerPlace);
        }
      }
    } else if ({ value }.value === "max") {
      if (maxPlace !== undefined) {
        if (maxPlace !== "" && maxPlace.length !== 0) {
          let query = dataString + maxPlace;
          // console.log(query);
          setQString(query);
          setMeetPlace(maxPlace);
        }
      }
    }
  }, [centerPlace, maxPlace, dataString, value]);

  useEffect(() => {
    getStores();
  }, [qString]);

  useEffect(() => {
    // console.log(stores);
    setStoreNum(Object.keys(stores).length);
    // console.log(storeNum);
  }, [stores]);

  const findCenter = () => {
    //  중심 위치의 자치구 찾기
    let geocoder = new window.kakao.maps.services.Geocoder();
    let cy = new Array();
    let cx = new Array();
    let ny = Number(0);
    let nx = Number(0);
    for (let i in area) {
      geocoder.addressSearch(area[i], function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          // console.log(coords);
          cy[i] = Number(result[0].y);
          cx[i] = Number(result[0].x);
          ny += cy[i];
          nx += cx[i];
          if (ny > 37.4 * area.length) {
            ny = ny / area.length;
            nx = nx / area.length;
            // console.log(ny + ", " + nx);
            let ncoords = new window.kakao.maps.LatLng(ny, nx);
            let callback = function (result, status) {
              if (status === window.kakao.maps.services.Status.OK) {
                // console.log(result[0].address_name);
                if (
                  result[0].address_name !== "" &&
                  result[0].address_name != undefined
                ) {
                  setCenterPlace(
                    result[0].region_1depth_name.slice(0, 2) +
                      result[0].region_2depth_name
                  );
                }
              }
            };
            geocoder.coord2RegionCode(nx, ny, callback);
          }
        }
      });
    }
  };

  const findMax = async () => {
    setLoading(true);
    let s_num = new Array();
    let max = -1; //  상점수
    let max_num = -1; //  지역 번호

    for (let i in area) {
      //  area에 있는 모든 지역 검색
      let tempString = dataString + area[i];
      let response = await HTTP.get(`/api/map?search=${tempString}`);
      // console.log(response.data.results);
      // console.log(Object.keys(response.data.results).length);
      s_num[i] = Object.keys(response.data.results).length;
      if (s_num[i] === 100) {
        // 가지치기
        break;
      }
    }

    for (let i in s_num) {
      // console.log("s_num["+i+"] : " + s_num[i]);
      if (s_num[i] > max) {
        max = s_num[i];
        max_num = i;
      }
    }
    setMaxPlace(area[max_num]);
    setLoading(false);
  };

  // 안쓰는 함수
  const findPlace = async () => {
    // let tempArea = new Array();
    if (
      centerPlace !== "" &&
      centerPlace !== undefined &&
      maxPlace !== "" &&
      maxPlace !== undefined
    ) {
      if (centerPlace === maxPlace) {
        setMeetPlace(centerPlace);
      } else {
        let centerString = dataString + centerPlace;
        let maxString = dataString + maxPlace;

        let response1 = await HTTP.get(`/api/map?search=${centerString}`);
        let response2 = await HTTP.get(`/api/map?search=${maxString}`);

        console.log("--- response1 결과 ---");
        console.log(response1.data.results);
        console.log(Object.keys(response1.data.results).length);

        console.log("--- response2 결과 ---");
        console.log(response2.data.results);
        console.log(Object.keys(response2.data.results).length);

        if (
          Object.keys(response1.data.results).length >=
          Object.keys(response2.data.results).length
        ) {
          setMeetPlace(centerPlace);
        } else {
          setMaxPlace(maxPlace);
        }
      }
    }
  };

  // const findPlace = async () => {
  //     setLoading(true);

  // let s_num = new Array();
  // let max = -1;   //  상점수
  // let max_num = -1;   //  지역 번호

  //     if(centerPlace !== '' && centerPlace !== undefined) {
  //         let tempString = dataString + centerPlace;
  //         let response = await HTTP.get(`/api/map?search=${tempString}`)
  //         // console.log(response.data.results);
  //         // console.log(Object.keys(response.data.results).length);
  //         s_num[0] = Object.keys(response.data.results).length;
  //     }
  //     if(s_num[0] !== 100){   //  중심지가 100개 있으면 더이상 필요 없음
  //         for(let i in area){
  //             let tempString = dataString + area[i];
  //             let response = await HTTP.get(`/api/map?search=${tempString}`)
  //             // console.log(response.data.results);
  //             // console.log(Object.keys(response.data.results).length);
  //             s_num[i+1] = Object.keys(response.data.results).length;
  //             if(s_num[i+1] === 100) {
  //                 // 가지치기
  //                 break;
  //             }
  //         }
  //     }
  //     for(let i in s_num) {
  //         // console.log("s_num["+i+"] : " + s_num[i]);
  //         if(s_num[i] > max){
  //             max = s_num[i];
  //             max_num = i;
  //         }
  //     }
  //     // console.log("최종 선택지 : " + area[max_num]);
  //     // console.log("최종 선택지 가게 수 : " + max);
  //     if(max_num == 0) {
  //         setMeetPlace(centerPlace);
  //     } else {
  //         setMeetPlace(area[max_num - 1]);
  //     }
  //     setLoading(false);
  // }

  const getStores = async () => {
    // let queryString = dataString + meetPlace;
    let queryString = qString;
    // if({value}.value === "center") {
    //     queryString = dataString + centerPlace;
    // } else if({value}.value === "max") {
    //     queryString = dataString + maxPlace;
    // }
    // const query = dataString === '' ? '' : `search=${dataString}`;
    setLoading(true);
    let response = await HTTP.get(`/api/map?search=${queryString}`);
    // console.log(response.data.results);
    setStores(response.data.results);
    setLoading(false);
  };

  return (
    <MeetResultBlock>
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        {meetPlace} 주변에서 해당하는 추천 장소 {storeNum}개 입니다.
      </div>
      <div>
        <MapView2 stores={stores} loading={loading} meetPlace={meetPlace} />
      </div>
      {/* {lifes.map((life) => (
                <p key={life}>{life}</p>
            ))} */}
      <br />
      <br />
      <br />
    </MeetResultBlock>
  );
};

export default MeetResultView2;
