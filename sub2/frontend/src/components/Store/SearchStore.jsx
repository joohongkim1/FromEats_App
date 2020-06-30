import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import rice from "../../images/rice.png";
import "../../styles/fonts/font.css";
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

function SearchStore({
  id,
  store_name,
  area,
  tel,
  address,
  category,
  img_url,
  mean_score,
  detail_lifestyle,
}) {
  return (
    <div>
      <StoreItemBlock>
        {{ img_url } && (
          <div className="thumbnail">
            <Link
              to={{
                pathname: `/detail/${id}`,
                state: {
                  id,
                  store_name,
                  area,
                  tel,
                  address,
                  category,
                  img_url,
                  mean_score,
                  detail_lifestyle,
                },
              }}
            >
              <img src={img_url} alt="thumbnail"></img>
            </Link>
          </div>
        )}
        <div className="contents">
          <div style={{ position: "relative" }}>
            <div>
              <Link to={`/detail/${id}`} style={{ fontSize: 30 }}>
                {store_name}
              </Link>
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
}
SearchStore.propTypes = {
  id: PropTypes.number.isRequired,
  store_name: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  img_url: PropTypes.string.isRequired,
};

export default SearchStore;
