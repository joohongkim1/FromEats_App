import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// import "../../fonts/font.css";

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChangeLocation from "../map/ChangeLocation";
import logo from "../../images/main_logo.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[100],
      textAlign: "center",
      fontFamily: "Recipe Korea",
    },
    header: {
      position: "relative",
      height: "60px",
    },
    auth: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 15,
    },
  })
);

function Header() {
  const login = window.localStorage.getItem("login");
  const id = window.localStorage.getItem("userInfo");
  const classes = useStyles();
  const logoutFunction = (e) => {
    window.localStorage.removeItem("login");
    window.location.reload();
  };
  return (
    <div className={classes.root}>
      <Link to="/lifestyle">
        <img src={logo} className={classes.header} />
      </Link>
      {!login && (
        <div style={{ marginTop: "10px" }}>
          <Link to="/login" style={{ paddingRight: "5px" }}>
            로그인
          </Link>
          <Link to="/register" style={{ paddingLeft: "5px" }}>
            회원가입
          </Link>
        </div>
      )}
      {login && (
        <div>
          <div>{id}님 환영합니다!</div>
          <Link to="/logout" onClick={logoutFunction}>
            로그아웃
          </Link>
        </div>
      )}

      <div className="Container">
        <ChangeLocation />
      </div>
    </div>
  );
}
export default Header;
