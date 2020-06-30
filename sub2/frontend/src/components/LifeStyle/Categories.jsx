import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "all",
    text: "전체보기",
  },
  {
    name: "커피",
    text: "커피 한잔의 낭만파",
  },
  {
    name: "고기압승파",
    text: "고기압승파",
  },
  {
    name: "가성비",
    text: "가성비 맛집 헌터파",
  },
  {
    name: "부드러운",
    text: "부드러운 음식으로 마음을 녹일 보들파",
  },
  {
    name: "점심",
    text: "점심 두둑히 먹어야 할 든든파",
  },
  {
    name: "진한",
    text: "진한 국물을 음미하는 어르신파",
  },
  {
    name: "저녁시간",
    text: "저녁시간, 가족과 오붓하게파",
  },
  {
    name: "리마리오",
    text: "리마리오 뺨치는 느끼함을 원하는 버터파",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  font-family: "Recipe Korea";
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;
const Category = styled(NavLink)`
  font-size: 2.5rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
  font-family: "Recipe Korea";
  a:hover {
    text-decoration: none;
  }

  &:hover {
    color: #495057;
  }
  &.active {
    /* font-weight: 600; */
    /* border-bottom: 2px solid #22b8cf; */
    text-decoration: none;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;

const Categories = ({ onSelect }) => {
  return (
    <div>
      <CategoriesBlock>
        {categories.map((c, index) => (
          <div key={index}>
            <Category
              activeClassName="active"
              exact={c.name === "all"}
              to={c.name === "all" ? "/lifestyle" : `/lifestyle/${c.name}`}
            >
              {c.text}
            </Category>
            <span
              style={{
                fontSize: "20px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              /
            </span>
          </div>
        ))}
      </CategoriesBlock>
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          height: "60px",
          fontSize: "20px",
          textAlign: "center",
          fontFamily: "ReciPe Korea",
        }}
      >
        라이프스타일에 맞게 즐겨보세요!
      </div>
      <hr style={{ border: "1px solid #ddd" }}></hr>
    </div>
  );
};

export default Categories;
