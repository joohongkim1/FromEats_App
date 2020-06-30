import React from "react";
import axios from "axios";
import SearchStore from "./SearchStore";
import Categories from "./Categories";

import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Checkbox from "@material-ui/core/Checkbox";

const categories = [
  {
    name: "한식",
    text: "한식",
  },
  {
    name: "술",
    text: "주점",
  },
  {
    name: "중식",
    text: "중식",
  },
  {
    name: "치킨",
    text: "치킨",
  },
  {
    name: "분식",
    text: "분식",
  },
  {
    name: "고기",
    text: "고기",
  },
  {
    name: "피자,파스타,스테이크",
    text: "양식",
  },
  {
    name: "족발",
    text: "족발",
  },
  {
    name: "카페",
    text: "카페",
  },
  {
    name: "돈가스",
    text: "돈가스/일식",
  },
  {
    name: "버거",
    text: "패스트푸드",
  },
  {
    name: "아시안요리",
    text: "아시안요리",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
  text-decoration: none;
`;

const Category = styled(NavLink)`
  /* font-size: 1.125rem; */
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }
  &.active {
    font-weight: 800;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;

class Search extends React.Component {
  state = {
    isLoading: true,
    stores: [],
    storesAll: [],
    searchState: false,
    value: "",
    filter: {
      전체보기: true,

      한식: false,
      술: false,
      중식: false,
      치킨: false,
      분식: false,
      고기: false,
      "피자,파스타,스테이크": false,
      족발: false,
      카페: false,
      돈가스: false,
      버거: false,
      아시안요리: false,
    },
  };

  recommendStore = async () => {
    try {
      const {
        data: { results },
      } = await axios.get("http://i02a205.p.ssafy.io:8001/api/recommend", {
        params: { search: 1, display: 20 },
        headers: {},
      });
      this.setState({ storesAll: results, isLoading: false });
      this.setState({ stores: results, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  getSearchStore = async () => {
    const search = this.state.value;
    try {
      if (search === "") {
        this.setState({ stores: [], isLoading: false });
      } else {
        const {
          data: { results },
        } = await axios.get("http://i02a205.p.ssafy.io:8001/api/storebyarea", {
          params: { search: search, display: 20 },
          headers: {},
        });
        this.setState({ storesAll: results, isLoading: false });
        this.setState({ stores: results, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.recommendStore();
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.getSearchStore();
  };

  getFilter = async (e) => {
    let obj = this.state.filter;
    obj[e.target.value] = e.target.checked;
    this.setState({ filter: obj });
    let flag = true;
    for (let o in obj) {
      if (o !== "전체보기") {
        if (obj[o] === true) {
          obj["전체보기"] = false;
          flag = false;
          break;
        }
      }
    }
    if (flag === true) {
      obj["전체보기"] = true;
    }
    if (obj["전체보기"] === true) {
      this.setState({ stores: this.state.storesAll });
      return;
    }
    const stores = await this.putStores();
    console.log(stores);
    const storesNew = await this.filtering(stores, obj);

    this.setState({ stores: storesNew });
    return;
  };
  putStores = () => {
    var stores = this.state.storesAll;
    return stores;
  };

  filtering = (stores, filters) => {
    console.log(filters);
    var storesNew = [];
    for (let f in filters) {
      if (filters[f] === true) {
        for (let store in stores) {
          if (stores[store]["big_cate"] === f) {
            storesNew.push(stores[store]);
          }
        }
      }
    }
    return storesNew;
  };

  render() {
    const { stores, isLoading } = this.state;
    return (
      <section className="container">
        {" "}
        {isLoading ? (
          <div className="loader">
            <div
              // className="loader__text"
              style={{
                textAlign: "center",
                marginTop: "60%",
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
            </div>{" "}
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            {" "}
            <div>
              {" "}
              <div className="input_div">
                {" "}
                <input
                  className="input_search"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder=" 지역을 검색해 보세요."
                  style={{
                    border: "2px solid",
                    borderRadius: 10,
                    width: "100%",
                    marginBottom: " 10px",
                    marginTop: "10px",
                    height: "30px",
                    fontFamily: "Recipe Korea",
                  }}
                />
                <CategoriesBlock>
                  {categories.map((c, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checked={this.state.filter[c.name]}
                          onChange={this.getFilter}
                          value={c.name}
                          checkedIcon={<Favorite />}
                          name="checkedH"
                        />
                      }
                      label={c.text}
                    />
                  ))}
                </CategoriesBlock>{" "}
              </div>{" "}
              <div className="stores">
                {" "}
                {stores.map((store, index) => (
                  <SearchStore
                    key={index}
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
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </form>
        )}{" "}
      </section>
    );
  }
}

export default Search;
