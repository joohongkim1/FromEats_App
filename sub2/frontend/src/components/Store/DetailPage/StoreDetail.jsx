import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import rice from "../../../images/rice.png";
import MapContent from "../MapContent";
import { func } from "prop-types";
import Review from "./Review";
import Menu from "./Menu";
import StoreInfo from "./StoreInfo";
import { Tab } from "semantic-ui-react";
import "./detail.css";

const StoreListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const StoreItemBlock = styled.div`
  .thumbnail {
    margin-right: 1rem;
    border-radius: 20px 20px 20px 20px;
    width: 100%;
    height: 270px;
    padding: 0px;
    img {
      display: block;
      border-radius: 20px 20px 20px 20px;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .contents {
    .title {
      color: #337ab7;
      font-size: 30px;
    }
    span {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
  font-family: "Recipe Korea";
`;

const Detail = (props) => {
  const [store, setStore] = useState(null);
  const [hour, setHour] = useState(null);
  const [reviews, setReview] = useState(null);
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    getStore(props.match.params.id);
  }, []);

  const getStore = async (id) => {
    // 기본 정보
    const response = await axios.get(
      `http://i02a205.p.ssafy.io:8001/api/storebycate/${id}`
    );
    console.log(response);
    setStore(response.data);
    // 시간 받아오는 부분
    const response2 = await axios.get(
      `http://i02a205.p.ssafy.io:8001/api/hours?search=${response.data.store}`
    );
    console.log(response2);
    setHour(response2.data.results);

    const response3 = await axios.get(
      `http://i02a205.p.ssafy.io:8001/api/reviews?search=${response.data.store}`
    );
    console.log(response3);
    setReview(response3.data);

    const response4 = await axios.get(
      `http://i02a205.p.ssafy.io:8001/api/menus?search=${response.data.store}`
    );
    console.log(response4);
    setMenus(response4.data.results);
  };

  if (!store) {
    return null;
  }

  if (!hour) {
    return null;
  }

  if (!reviews) {
    return null;
  }

  if (!menus) {
    return null;
  }

  if (store.tel === "") {
    store.tel = "없음";
  }
  const panes = [
    {
      menuItem: "가게정보",
      render: () => (
        <Tab.Pane>
          <hr style={{ border: "1px solid #ddd" }}></hr>

          <StoreInfo store={store}></StoreInfo>
          <p style={{ fontSize: "17px" }}>
            ※ 운영시간(평일) : {hour[0].start_time.substring(0, 5)} ~{" "}
            {hour[0].end_time.substring(0, 5)}
          </p>
          <p style={{ fontSize: "17px" }}>
            ※ 운영시간(토, 일) : {hour[1].start_time.substring(0, 5)} ~{" "}
            {hour[1].end_time.substring(0, 5)}
          </p>
          <br></br>
          <hr style={{ border: "1px solid #ddd" }}></hr>
          <Menu menus={menus} />

          {/* <Review item={reviews} store={store}></Review> */}

          <hr style={{ border: "1px solid #ddd" }}></hr>

          <MapContent
            lat={store.latitude}
            long={store.longitude}
            address={store.address}
          ></MapContent>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "리뷰",
      render: () => (
        <Tab.Pane>
          <Review item={reviews} store={store}></Review>
        </Tab.Pane>
      ),
    },
  ];
  const panes2 = [
    {
      menuItem: "가게정보",
      render: () => (
        <Tab.Pane>
          <hr style={{ border: "1px solid #ddd" }}></hr>

          <StoreInfo store={store}></StoreInfo>
          <p style={{ fontSize: "17px" }}>※ 운영시간 : 매장문의</p>
          <br></br>
          <hr style={{ border: "1px solid #ddd" }}></hr>
          <Menu menus={menus} />
          {/* <Review item={reviews} store={store}></Review> */}

          <hr style={{ border: "1px solid #ddd" }}></hr>
          <MapContent
            lat={store.latitude}
            long={store.longitude}
            address={store.address}
          ></MapContent>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "리뷰",
      render: () => (
        <Tab.Pane>
          <Review item={reviews} store={store}></Review>
        </Tab.Pane>
      ),
    },
  ];
  const panes3 = [
    {
      menuItem: "가게정보",
      render: () => (
        <Tab.Pane>
          <hr style={{ border: "1px solid #ddd" }}></hr>

          <StoreInfo store={store}></StoreInfo>
          <p style={{ fontSize: "17px" }}>
            ※ 운영시간(휴무일 없음) : {hour[0].start_time.substring(0, 5)} ~{" "}
            {hour[0].end_time.substring(0, 5)}
          </p>
          <br></br>
          <hr style={{ border: "1px solid #ddd" }}></hr>
          <Menu menus={menus} />

          {/* <Review item={reviews} store={store}></Review> */}

          <hr style={{ border: "1px solid #ddd" }}></hr>
          <MapContent
            lat={store.latitude}
            long={store.longitude}
            address={store.address}
          ></MapContent>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "리뷰",
      render: () => (
        <Tab.Pane>
          <Review item={reviews} store={store}></Review>
        </Tab.Pane>
      ),
    },
  ];

  const TabExampleBasic = () => <Tab panes={panes} />;
  const TabExampleBasic2 = () => <Tab panes={panes2} />;
  const TabExampleBasic3 = () => <Tab panes={panes3} />;

  if (hour.length === 0) {
    return store ? (
      <div style={{ backgroundColor: "#fafbfc" }}>
        <StoreListBlock>
          <StoreItemBlock>
            <div className="thumbnail">
              <img src={store.img_url} alt="thumbnail"></img>
            </div>

            <div className="contents">
              <TabExampleBasic2 />
            </div>
          </StoreItemBlock>
        </StoreListBlock>
        <div style={{ marginBottom: 50 }}></div>
      </div>
    ) : (
      ""
    );
  } else if (hour.length === 1) {
    return store ? (
      <div style={{ backgroundColor: "#fafbfc" }}>
        <StoreListBlock>
          <StoreItemBlock>
            <div className="thumbnail">
              <Link to={`/detail/${store.id}`}>
                <img src={store.img_url} alt="thumbnail"></img>
              </Link>
            </div>

            <div className="contents">
              <TabExampleBasic3 />
              {/* <StoreInfo store={store} /> */}
            </div>
          </StoreItemBlock>
        </StoreListBlock>
        <div style={{ marginBottom: 50 }}></div>
      </div>
    ) : (
      ""
    );
  } else {
    return store ? (
      <div style={{ backgroundColor: "#fafbfc" }}>
        <StoreListBlock>
          <StoreItemBlock>
            <div className="thumbnail">
              <img src={store.img_url} alt="thumbnail"></img>
            </div>
            <div className="contents">
              <TabExampleBasic></TabExampleBasic>
            </div>
          </StoreItemBlock>
        </StoreListBlock>

        <div style={{ marginBottom: 50 }}></div>
      </div>
    ) : (
      ""
    );
  }
};

export default Detail;
