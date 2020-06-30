import React, { useEffect, useState } from "react";
import HTTP from "../../modules/api/client";
import MapView3 from "./MapView3";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const MapTemplateBlock = styled.div`
  font-family: "Recipe Korea";
`;

const useStyles = makeStyles((theme) => ({
  inputText: {
    margin: theme.spacing(1),
    width: "70%",
    fontSize: "50px",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "70%",
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const lifes = [
  "가성비 맛집 헌터파",
  "고기압승파",
  "리마리오 뺨치는 느끼함을 원하는 버터파",
  "부드러운 음식으로 마음을 녹일 보들파",
  "저녁시간, 가족과 오붓하게파",
  "점심 두둑히 먹어야 할 든든파",
  "진한 국물을 음미하는 어르신파",
  "커피 한잔의 낭만파",
];

const firstlifes = [
  "가성비맛집헌터파",
  "고기압승파",
  "리마리오뺨치는느끼함을원하는버터파",
  "부드러운음식으로마음을녹일보들파",
  "저녁시간가족과오붓하게파",
  "점심두둑히먹어야할든든파",
  "진한국물을음미하는어르신파",
  "커피한잔의낭만파",
];

const secondlifes = [
  [
    { id: 1, text: "고기" },
    { id: 2, text: "돈가스*회*일식" },
    { id: 3, text: "피자*파스타*스테이크" },
    { id: 4, text: "한식" },
  ],
  [
    { id: 5, text: "고기" },
    { id: 6, text: "족발*보쌈" },
    { id: 7, text: "치킨" },
  ],
  [
    { id: 8, text: "버거" },
    { id: 9, text: "피자*파스타*스테이크" },
  ],
  [
    { id: 10, text: "아시안요리" },
    { id: 11, text: "족발*보쌈" },
    { id: 12, text: "한식" },
  ],
  [
    { id: 13, text: "고기" },
    { id: 14, text: "술" },
    { id: 15, text: "중식" },
    { id: 16, text: "한식" },
  ],
  [
    { id: 17, text: "돈가스*회*일식" },
    { id: 18, text: "버거" },
    { id: 19, text: "분식" },
    { id: 20, text: "족발*보쌈" },
    { id: 21, text: "치킨" },
  ],
  [
    { id: 22, text: "술" },
    { id: 23, text: "중식" },
    { id: 24, text: "한식" },
  ],
  [{ id: 25, text: "카페" }],
];

const MapTemplate = () => {
  const classes = useStyles();
  const [inputArea, setInputArea] = useState("");
  const [stores, setStores] = useState({});
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [secondLife, setSecondLife] = useState([]);
  const [lifeString, setLifeString] = useState("");
  const [storeNum, setStoreNum] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getStores();
    // setArea('서울중구');
  }, [lifeString]);

  useEffect(() => {
    setStoreNum(Object.keys(stores).length);
  }, [stores]);

  // useEffect(() => {
  //     console.log("area : " + area);
  // }, [area]);

  // useEffect(() => {
  //     console.log("inputArea : " + inputArea);
  // }, [inputArea]);

  const selectInputArea = (event) => {
    setInputArea(event.target.value);
  };

  const selectArea = () => {
    let areaString = "";
    let inputArr = inputArea.split(" ");
    for (let i in inputArr) {
      // console.log(inputArr[i]);
      areaString += inputArr[i];
    }
    // console.log(areaString);
    setArea(areaString);
    // setArea(inputArea);
  };

  const selectSecondLife = (event) => {
    const inSubheader = event.target.value.indexOf("subheader") !== -1;
    if (inSubheader) {
      //  subheader가 선택되는 것을 방지한다.
    } else {
      setSecondLife(event.target.value);
    }
  };
  const setData = () => {
    selectArea();
    // selectLifeString();
  };
  useEffect(() => {
    selectLifeString();
  }, [area]);

  const selectLifeString = () => {
    const temp = secondLife;
    temp.sort(function (a, b) {
      return a - b;
    });

    let tempString = "";

    let cate = new Array();
    cate[0] = "";
    cate[1] = "";
    cate[2] = "";
    cate[3] = "";
    cate[4] = "";
    cate[5] = "";
    cate[6] = "";
    cate[7] = "";

    for (let i in temp) {
      let num;
      let j;
      if (temp[i] >= 1 && temp[i] <= 4) {
        num = temp[i] - 1;
        j = 0;
      } else if (temp[i] >= 5 && temp[i] <= 7) {
        num = temp[i] - 5;
        j = 1;
      } else if (temp[i] >= 8 && temp[i] <= 9) {
        num = temp[i] - 8;
        j = 2;
      } else if (temp[i] >= 10 && temp[i] <= 12) {
        num = temp[i] - 10;
        j = 3;
      } else if (temp[i] >= 13 && temp[i] <= 16) {
        num = temp[i] - 13;
        j = 4;
      } else if (temp[i] >= 17 && temp[i] <= 21) {
        num = temp[i] - 17;
        j = 5;
      } else if (temp[i] >= 22 && temp[i] <= 24) {
        num = temp[i] - 22;
        j = 6;
      } else if (temp[i] === 25) {
        num = temp[i] - 25;
        j = 7;
      }

      if (cate[j] === "") {
        cate[j] = cate[j] + "-" + secondlifes[j][num].text;
      } else {
        cate[j] = cate[j] + "," + secondlifes[j][num].text;
      }
    }

    for (let i in cate) {
      if (cate[i] !== "") {
        cate[i] = firstlifes[i] + cate[i];
        tempString = tempString + cate[i] + "!";
      }
    }
    if (area !== "") {
      tempString = tempString + area;
    }
    // 이제 띄어쓰기 문제를 해결해서 area에 대입한 후 area가 변경되면
    // 함수 호출이 되게 만들어서 inputArea 대신 area를 쓴다.
    // if(inputArea !== '') {
    //     tempString = tempString + inputArea;
    // }
    // console.log(tempString);
    setLifeString(tempString);
  };

  const getStores = async () => {
    setLoading(true);
    let response = await HTTP.get(`/api/map?search=${lifeString}`);
    // console.log("---- getStores에서 부름 ---- ");
    // console.log(response.data.results[0]);
    // console.log(response.data.results);
    setStores(response.data.results);
    setLoading(false);
  };

  return (
    <MapTemplateBlock>
      <TextField
        className={classes.inputText}
        id="standard-basic"
        label="Area"
        value={inputArea}
        onChange={selectInputArea}
      />
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Help
      </Button>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">
          Main -> Sub Life
        </InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={secondLife}
          onChange={selectSecondLife}
          input={<Input />}
          renderValue={(selected) => {
            selected.join(", ");
            return (
              Object.keys(secondLife).length + "개의 항목이 선택되었습니다."
            );
          }}
          MenuProps={MenuProps}
        >
          {/* {lifes.map((life, index) => (
                        <ul key={life}>
                            <ListSubheader value="subheader">{lifes[index]}</ListSubheader>
                            {secondlifes[index].map((secondlife) => (
                                <MenuItem key={secondlife} value={secondlife}>
                                    <Checkbox checked={secondLife.indexOf(secondlife) > -1}/>
                                    <ListItemText primary={secondlife} />
                                </MenuItem>
                            ))}
                        </ul>
                    ))} */}
          <ListSubheader value="subheader">{lifes[0]}</ListSubheader>
          {secondlifes[0].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
          <ListSubheader value="subheader">{lifes[1]}</ListSubheader>
          {secondlifes[1].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
          <ListSubheader value="subheader">{lifes[2]}</ListSubheader>
          {secondlifes[2].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
          <ListSubheader value="subheader">{lifes[3]}</ListSubheader>
          {secondlifes[3].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
          <ListSubheader value="subheader">{lifes[4]}</ListSubheader>
          {secondlifes[4].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
          <ListSubheader value="subheader">{lifes[5]}</ListSubheader>
          {secondlifes[5].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
          <ListSubheader value="subheader">{lifes[6]}</ListSubheader>
          {secondlifes[6].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
          <ListSubheader value="subheader">{lifes[7]}</ListSubheader>
          {secondlifes[7].map((secondlife) => (
            <MenuItem key={secondlife.id} value={secondlife.id}>
              <Checkbox checked={secondLife.indexOf(secondlife.id) > -1} />
              <ListItemText primary={secondlife.text} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={setData}
      >
        검색!!
      </Button>
      <br />
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Area 검색 방법"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              특별시 및 광역시인 경우 : 서울중구, 대전서구
              <br />
              그 외 시인 경우 : 수원시영통구
              <br />그 외 군인 경우 : 진천군
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <hr />
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        {area} 주변에서 해당하는 추천 장소 {storeNum}개 입니다.
      </div>
      <MapView3 stores={stores} loading={loading} area={area} />
    </MapTemplateBlock>
  );
};

export default MapTemplate;
