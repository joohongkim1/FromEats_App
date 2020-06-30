import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import rice from "../../images/rice.png";
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
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
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

const StoreItem = ({ store }) => {
  const { id, store_name, tel, address, category, img_url, mean_score } = store;
  return (
    <StoreItemBlock>
      {{ img_url } && (
        <div className="thumbnail">
          <Link to={`/detail/${id}`}>
            <img src={img_url} alt="thumbnail"></img>
          </Link>
        </div>
      )}
      <div className="contents">
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 30 }}>
            <Link to={`/detail/${id}`}>{store_name}</Link>
          </div>
          <div component="fieldset" mb={1}>
            <StyledRating
              name="customized-color"
              defaultValue={mean_score}
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              readOnly
              size="large"
              style={{ fontSize: "30px" }}
            />
          </div>
        </div>
        <div>
          <p>평점 : {mean_score.toFixed(2)} 점</p>
          <p>주소 : {address}</p>
          <p>전화번호 : {tel}</p>
          <p>카테고리 : {category}</p>
        </div>
      </div>
    </StoreItemBlock>
  );
};

export default StoreItem;
