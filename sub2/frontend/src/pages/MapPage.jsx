import React, { useEffect, useState } from "react";
import MeetTemplate from "../components/meet/MeetTemplate";
import MapTemplate from "../components/map/MapTemplate";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./a.css";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "block",
//     backgroundColor: "#ffffff",
//     height: "100%",
//     width: "100%",
//     border: "1px solid rgba(0, 0, 0, .2)",
//     borderRadius: " 10px 10px 10px 10px",
//     // marginBottom: "200px",
//     // paddingBottom: "30px",
//   },
// }));

const MapPage = () => {
  const [value, setValue] = useState("promise");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function PageBlock() {
    if (value === "promise") {
      return <MeetTemplate />;
    } else {
      return <MapTemplate />;
    }
  }

  return (
    <div>
      <div align="center">
        <p
          style={{
            marginTop: "20px",
            fontFamily: "Recipe Korea",
            fontSize: "20px",
          }}
        >
          친구와 약속 장소를 정해보세요!
        </p>
        <hr style={{ border: "1px solid #ddd" }}></hr>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="mapType"
            name="maptype1"
            value={value}
            onChange={handleChange}
            style={{ fontSize: "50px" }}
          >
            <FormControlLabel
              value="promise"
              control={<Radio />}
              label="약속잡기(서울만 지원중)"
            />
            <FormControlLabel
              value="foodmap"
              control={<Radio />}
              label="음식지도(장소 직접입력)"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <PageBlock />
    </div>
  );
  // const classes = useStyles();
};

export default MapPage;
