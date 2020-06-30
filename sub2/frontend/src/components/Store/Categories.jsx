import React from "react";
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
    name: "피자",
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

const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map((c, index) => (
        // <Category
        //   key={c.name}
        //   activeClassName="active"
        //   exact
        //   to="/store"
        //   to={`/store/${c.name}`}
        //   style={{
        //     fontSize: 20,
        //     fontWeight: 500,
        //     fontFamily: "Recipe Korea",
        //     textDecoration: "none",
        //   }}
        // >
        //   {c.text}
        // </Category>
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
            />
          }
          label={c.text}
        />
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
