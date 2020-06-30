import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import TouchAppIcon from "@material-ui/icons/TouchApp";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    height: "60px",
    borderTop: "1px solid #9c9c9c",
    bottom: "-3px",
    zIndex: "1",
  },
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      // showLabels
      className={classes.root}
      style={{ backgroundColor: "#ffffff" }}
    >
      <BottomNavigationAction
        className={classes.temp}
        component={Link}
        to="/lifestyle"
        label="LifeStyle"
        icon={<TouchAppIcon />}
      ></BottomNavigationAction>
      <BottomNavigationAction
        component={Link}
        to="/store"
        label="카테고리 검색"
        icon={<SearchIcon />}
      />
      {/* <BottomNavigationAction
        component={Link}
        to="/meet"
        label="약속잡기"
        icon={<FavoriteIcon />}
      /> */}
      <BottomNavigationAction
        component={Link}
        to="/map"
        label="음식지도"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/mypage"
        label="내정보"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}
