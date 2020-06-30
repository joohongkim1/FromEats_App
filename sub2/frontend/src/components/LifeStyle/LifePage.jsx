import React from "react";
import Categories from "./Categories";
import LifeList from "./LifeList";

const LifePage = ({ match }) => {
  // 카테고리가 선택되지 않았으면 기본값 all로 사용
  const category = match.params.category || "all";

  return (
    <>
      <Categories />
      <LifeList category={category} />
    </>
  );
};

export default LifePage;
