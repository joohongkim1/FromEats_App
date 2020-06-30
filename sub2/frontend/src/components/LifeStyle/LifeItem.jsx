import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../styles/fonts/font.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const StoreItemBlock = styled.div`
  .thumbnail {
    margin-right: 1rem;
    border-radius: 20px 20px 20px 20px;
    width: 100%;
    height: 250px;
    padding: 0px;
    img {
      display: block;
      border-radius: 20px 20px 20px 20px;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .contents {
    h2 {
      margin: 0;
      /* font-weight: 800; */

      a {
        color: black;
      }
    }
    span {
      margin: 0;
      line-height: 2;
      white-space: normal;
      /* font-size: 40; */
    }
  }
  & + & {
    margin-top: 3rem;
  }
  font-family: "Recipe Korea";
`;
const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

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

const NewsItem = ({ article }) => {
  const {
    id,
    store,
    store_name,
    img_url,
    mean_score,
    address,
    category,
    tel,
    detail_lifestyle,
  } = article;
  return (
    <div>
      <StoreItemBlock>
        {{ img_url } && (
          <div className="thumbnail">
            <Link to={`/detail/${id}`}>
              <img src={img_url} alt="thumbnail"></img>
            </Link>
          </div>
        )}
        <div className="contents">
          <div>
            <div style={{ height: "25px", marginBottom: "10px" }}>
              <Link to={`/detail/${id}`}>
                <h2>{store_name}</h2>
              </Link>
            </div>
            <div component="fieldset" mb={3}>
              <StyledRating
                name="customized-color"
                defaultValue={mean_score}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                readOnly
                size="large"
                style={{ fontSize: "25px" }}
              />
            </div>
          </div>
          <span style={{ color: "gray", fontSize: "20px" }}>
            # {detail_lifestyle}
          </span>
          <div>
            <div>
              <img
                src="https://image.flaticon.com/icons/svg/1603/1603847.svg"
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              ></img>

              <span>평점 : {mean_score.toFixed(2)} 점</span>
            </div>
            <div>
              <img
                src="https://image.flaticon.com/icons/svg/1076/1076323.svg"
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              ></img>

              <span>주소 : {address}</span>
            </div>
            <div>
              <img
                src="https://image.flaticon.com/icons/png/512/684/684920.png"
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              ></img>

              <span>전화번호 : {tel}</span>
            </div>
            <div>
              <img
                src="https://image.flaticon.com/icons/svg/2422/2422208.svg"
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              ></img>

              <span>카테고리 : {category}</span>
            </div>
          </div>
        </div>
      </StoreItemBlock>
      <div style={{ marginBottom: "80px" }}></div>
    </div>
  );
};

export default NewsItem;
