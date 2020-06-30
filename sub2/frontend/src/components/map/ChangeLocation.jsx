import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  box: {
    textAlign: "center",
    height: "40px",
    paddingTop: "11px",
    borderBottom: "1px solid #9c9c9c",
    fontSize: "15px",
  },
}));

function ChangeLocation() {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.box}>
        서울특별시 강남구 역삼동
        <ExpandMoreIcon style={{ width: 20, height: 20 }}></ExpandMoreIcon>
      </Typography>
    </div>
  );
}
export default ChangeLocation;
