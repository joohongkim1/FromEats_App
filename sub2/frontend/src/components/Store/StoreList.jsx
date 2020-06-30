import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StoreItem from "./StoreItem";
import axios from "axios";
import Search from "./SearchBar";
import "../Common/a.css";

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

const StoreList = ({ category }) => {
  const [stores, setStores] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === "all" ? "" : `${category}`;
        const response = await axios.get(
          `http://i02a205.p.ssafy.io:8001/api/storebycate?search=${query}`
        );
        setStores(response.data.results);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);
  if (loading) {
    return (
      <StoreListBlock
        style={{
          textAlign: "center",
          fontFamily: "Recipe Korea",
          fontSize: "30px",
          marginTop: "200px",
        }}
      >
        로딩중!
      </StoreListBlock>
    );
  }
  if (!stores) {
    return null;
  }

  return (
    <StoreListBlock>
      {stores.map((store) => (
        <StoreItem key={store.id} store={store} />
      ))}
    </StoreListBlock>
  );
};

export default StoreList;
