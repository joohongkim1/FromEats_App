import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";

import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

const fuctions = [
  {
    name: "recommend",
    text: "추천 음식점",
  },
  {
    name: "name",
    text: "식당명 검색",
  },
  {
    name: "area",
    text: "지역별 검색",
  },
];

const FunctionsBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin-left: "2%";

  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    margin-left: "2%";
  }
  text-decoration: none;
`;

const Functions = styled(NavLink)`
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

const FunctionMenu = () => {
  return (
    <FunctionsBlock>
      {fuctions.map((c) => (
        <Functions
          key={c.name}
          activeClassName="active"
          exact={c.name === "recommend"}
          to={c.name === "recommend" ? "/store/" : `/store/${c.name}`}
          style={{
            fontSize: 20,
            fontWeight: 500,
            fontFamily: "Recipe Korea",
            textDecoration: "none",
          }}
        >
          {c.text}
        </Functions>
      ))}
    </FunctionsBlock>
  );
};

export default FunctionMenu;
