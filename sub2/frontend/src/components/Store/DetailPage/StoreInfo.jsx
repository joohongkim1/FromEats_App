import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    bigfont: {
      fontSize: "20px",
      color: "gray",
    },
    smallfont: {
      fontSize: "15px",
    },
    image: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
    },
  })
);
export default function (props) {
  const classes = useStyles();

  const store = props.store;
  return (
    <div>
      <h1 style={{ color: "#337ab7" }}>{store.store_name}</h1>
      <br />
      <p className={classes.bigfont}># {store.big_cate}</p>
      <p className={classes.bigfont}># {store.lifestyle.substring()}</p>
      <p className={classes.bigfont}># {store.detail_lifestyle}</p>
      <br />
      <div>
        <img
          src="https://image.flaticon.com/icons/svg/1603/1603847.svg"
          alt="rating"
          className={classes.image}
        ></img>
        <span style={{ fontSize: "17px" }}>
          평점 : {store.mean_score.toFixed(1)} 점
        </span>
      </div>
      <div>
        <img
          src="https://image.flaticon.com/icons/svg/1076/1076323.svg"
          alt=""
          className={classes.image}
        />
        <span className={classes.smallfont}>주소 : {store.address}</span>
      </div>
      <div>
        <img
          src="https://image.flaticon.com/icons/png/512/684/684920.png"
          alt="phone"
          className={classes.image}
        />
        <span className={classes.smallfont}>전화번호 : {store.tel}</span>
      </div>
      <div>
        <img
          src="https://image.flaticon.com/icons/svg/2422/2422208.svg"
          className={classes.image}
        ></img>
        <span className={classes.smallfont}>카테고리 : {store.category}</span>
      </div>
      <br></br>
    </div>
  );
}
