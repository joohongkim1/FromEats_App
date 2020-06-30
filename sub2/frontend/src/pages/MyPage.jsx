import React, { Component } from "react";
import Categories from "../components/Store/Categories";
import StoreList from "../components/Store/StoreList";
import Search from "../components/Store/SearchBar";
import SearchRegion from "../components/Store/SearchRegionBar";
import Recommend from "../components/Store/Recommend";
import FunctionMenu from "../components/Store/FunctionMenu";
import SearchStore from "../components/Store/SearchStore";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

class MyPage extends React.Component {
  state = {
    isLoading: true,
    reviews: [],
    searchState: false,
    value: "",
    lifestyles: {},
    lifestylesArr: [{ ratio: 0, name: "" }],
    id: "",
    stores: [],
    data: [],
    labels: [],
  };

  findLifestyle = async () => {
    try {
      const {
        data: { results },
      } = await axios.get("http://i02a205.p.ssafy.io:8001/api/recommend2", {
        params: { search: 1 },
        headers: {},
      });
      this.setState({ reviews: results, isLoading: false });
      const reviewLength = this.state.reviews.length;
      for (let i = 0; i < reviewLength; i++) {
        const ls = this.state.reviews[i]["lifestyle"];
        if (ls in this.state.lifestyles) {
          this.state.lifestyles[ls]++;
        } else {
          this.state.lifestyles[ls] = 1;
        }
      }
      var lifestylesArray = [];
      const labels = [];
      const data = [];
      for (var ll in this.state.lifestyles) {
        const r = Math.round((this.state.lifestyles[ll] / 47) * 100);
        lifestylesArray.push({ ratio: r, name: ll });
        labels.push(ll);
        data.push(r);
      }
      lifestylesArray.sort(function (a, b) {
        return b["ratio"] - a["ratio"];
      });
      this.setState({
        lifestylesArr: lifestylesArray,
        labels: labels,
        data: data,
      });
      this.recommendStore();
    } catch (error) {
      console.log(error);
    }
  };

  recommendStore = async () => {
    try {
      const {
        data: { results },
      } = await axios.get("http://i02a205.p.ssafy.io:8001/api/lifestyle", {
        params: { search: this.state.lifestylesArr[0]["name"], display: 20 },
        headers: {},
      });

      var resultsNew = [];
      for (let i = 0; i < 5; i++) {
        var ranNum = Math.floor(Math.random() * 100);
        resultsNew.push(results[ranNum]);
      }

      this.setState({ stores: resultsNew, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.state.id = window.localStorage.getItem("userInfo");
    this.findLifestyle();
  }

  render() {
    const expData = {
      labels: this.state.labels,
      datasets: [
        {
          labels: this.state.labels,
          data: this.state.data,
          borderWidth: 2,
          hoverBorderWidth: 3,
          backgroundColor: [
            "rgba(238, 102, 121, 1)",
            "rgba(98, 181, 229, 1)",
            "rgba(255, 198, 0, 1)",
            "rgba(0, 255, 0, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(255, 255, 0, 1)",
            "rgba(255, 0, 255, 1)",
            "rgba(192, 192, 192, 1)",
          ],
          fill: true,
        },
      ],
    };
    if (this.state.isLoading) {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "50%",
            fontSize: "30px",
            fontFamily: "Recipe Korea",
          }}
        >
          <img
            src="https://image.flaticon.com/icons/svg/2848/2848018.svg"
            alt=""
            style={{ width: 40, height: 40 }}
          />
          <span>로딩중~</span>
        </div>
      );
    }

    return (
      <div style={{ width: "90%", marginLeft: "18px", marginTop: "30px" }}>
        <div style={{ fontFamily: "Recipe Korea" }}>
          <div>
            <div style={{ fontSize: "20px" }}>
              <p>고객님의 리뷰를 분석하여</p>
              <p> 선호 라이프스타일 음식점을</p>
              추천해드립니다.
            </div>
            <hr style={{ border: "1px solid #ddd" }}></hr>
            <p>{this.state.id} 님의 라이프스타일</p>
            <p style={{ fontSize: "25px", color: "orange" }}>
              {this.state.lifestylesArr[0]["name"]}!
            </p>
            <p style={{ fontSize: "20px" }}>
              선호도 : {this.state.lifestylesArr[0]["ratio"]}%
            </p>
          </div>
          <hr style={{ border: "1px solid #ddd" }}></hr>
          <h3 style={{ fontFamily: "Recipe Korea", fontSize: "25px" }}>
            회원님의 라이프스타일 분포도
          </h3>
          <div>
            <Pie
              options={{
                legend: {
                  display: true,
                  // position: "right",
                },
                devicePixelRatio: 1,
              }}
              data={expData}
              height={400}
              width={300}
            />
          </div>
          <hr style={{ border: "1px solid #ddd" }}></hr>
          <div>
            <h3
              style={{
                textAlign: "center",
                marginTop: "50px",
                fontSize: "30px",
              }}
            >
              추천 리스트
            </h3>
            {this.state.stores.map((store, index) => (
              <div key={index}>
                <SearchStore
                  key={store.id}
                  id={store.id}
                  store_name={store.store_name}
                  area={store.area}
                  tel={store.tel}
                  address={store.address}
                  category={store.category}
                  img_url={store.img_url}
                  mean_score={store.mean_score}
                  detail_lifestyle={store.detail_lifestyle}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "100px" }}></div>
      </div>
    );
  }
}

export default MyPage;
