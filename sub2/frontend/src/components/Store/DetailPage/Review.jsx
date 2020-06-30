import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import ShowMore from "react-show-more";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function Review(props) {
  const arr = new Array();
  const review = props.item.results;
  console.log(props);
  review.map((r) => {
    if (r.content !== "") {
      arr.push([r.content, r.score, r.id, r.reg_time]);
    }
  });

  return (
    <div>
      <hr
        style={{
          border: "1px solid #ddd",
        }}
      ></hr>
      <h3 style={{ textAlign: "center", fontFamily: "Recipe Korea" }}>리뷰</h3>
      <div>
        <p style={{ textAlign: "right" }}>{props.item.count} 건의 리뷰</p>
        {arr.map((r, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              height: "100%",
              marginBottom: "20px",
              padding: 10,
              borderRadius: "10px 10px 10px 10px",
            }}
          >
            <img
              src="https://image.flaticon.com/icons/svg/1738/1738691.svg"
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            <span>{r[2]}</span>
            <span style={{ display: "inline-block", marginLeft: "5px" }}>
              {" "}
              ({r[1]}점)
            </span>
            <span style={{ display: "inline-block", float: "right" }}>
              {r[3].substring(0, 10)}
            </span>
            <div component="fieldset" mb={4} style={{ marginBottom: "10px" }}>
              <Rating
                name="customized-color"
                defaultValue={r[1]}
                precision={0.5}
                // icon={<FavoriteIcon fontSize="inherit" />}
                readOnly
                size="small"
                style={{ fontSize: "20px" }}
              />
            </div>
            <div style={{ fontFamily: "Recipe Korea" }}>
              <ShowMore lines={4} more="더보기" less="숨기기" anchorClass="">
                {r[0]}
              </ShowMore>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
