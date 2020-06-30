import React from "react";
import Categories from "../components/Store/Categories";
import StoreList from "../components/Store/StoreList";
import Search from "../components/Store/SearchBar";
import SearchRegion from "../components/Store/SearchRegionBar";
import Recommend from "../components/Store/Recommend";
import FunctionMenu from "../components/Store/FunctionMenu";

const StorePage = ({ match }) => {
  const functions = match.params.function;
  if (functions === "name") {
    return (
      <>
        {/* 검색 기능 1. 검색어로 검색 2. 카테고리별 검색 3. 라이프스타일로 검색 4. 지역 검색 */}
        <FunctionMenu />
        <Search />
        {/* <SearchRegion/> */}

        {/* <StoreList category={category} /> */}
      </>
    );
  } else if (functions === "area") {
    return (
      <>
        {/* 검색 기능 1. 검색어로 검색 2. 카테고리별 검색 3. 라이프스타일로 검색 4. 지역 검색 */}
        <FunctionMenu />
        {/* <Search /> */}
        <SearchRegion />

        {/* <StoreList category={category} /> */}
      </>
    );
  } else {
    return (
      <>
        {/* 검색 기능 1. 검색어로 검색 2. 카테고리별 검색 3. 라이프스타일로 검색 4. 지역 검색 */}
        <FunctionMenu />
        {/* <Search /> */}
        <Recommend />

        {/* <StoreList category={category} /> */}
      </>
    );
  }
};

export default StorePage;
