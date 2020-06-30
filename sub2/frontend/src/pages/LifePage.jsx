import React from "react";
import LifeCate from "../components/LifeStyle/LifeCate";
import LifeList from "../components/LifeStyle/LifeList";

const LifePage = ({ match }) => {
  // 카테고리가 선택되지 않았으면 기본값 all로 사용
  console.log(match);
  const category = match.params.category;

  return (
    <>
      <LifeCate />
      <LifeList category={category} />
    </>
  );
};

export default LifePage;
