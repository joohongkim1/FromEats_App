import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./LifeItem";
import axios from "axios";

const NewsListBlock = styled.div`
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

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === "all" ? "" : `?search=${category}`;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/lifestyle${query}`
        );
        setArticles(response.data.results);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return (
      <NewsListBlock
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
      </NewsListBlock>
    );
  }

  if (!articles) {
    return null;
  }
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.store} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
