import React, { useState, useEffect } from "react";
import MeetResultView2 from "./MeetResultView2";
// import clsx from 'clsx';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
// import Chip from '@material-ui/core/Chip';
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: "orange",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "70%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
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

const areas = [
  "서울강남구",
  "서울강동구",
  "서울강북구",
  "서울강서구",
  "서울관악구",
  "서울광진구",
  "서울구로구",
  "서울금천구",
  "서울노원구",
  "서울도봉구",
  "서울동대문구",
  "서울동작구",
  "서울마포구",
  "서울서대문구",
  "서울서초구",
  "서울성동구",
  "서울성북구",
  "서울송파구",
  "서울양천구",
  "서울영등포구",
  "서울용산구",
  "서울은평구",
  "서울종로구",
  "서울중구",
  "서울중랑구",
];

// 여기서부터 막 추가한 소스

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

// const secondlifes = [
//     [
//         '고기',
//         '돈가스,회,일식',
//         '피자,파스타,스테이크',
//         '한식',
//     ],
//     [
//         '고기',
//         '족발, 보쌈',
//         '치킨',
//     ],
//     [
//         '버거',
//         '피자,파스타,스테이크',
//     ],
//     [
//         '아시안요리',
//         '족발, 보쌈',
//         '한식',
//     ],
//     [
//         '고기',
//         '술',
//         '중식',
//         '한식'
//     ],
//     [
//         '돈가스,회,일식',
//         '버거',
//         '분식',
//         '족발, 보쌈',
//         '치킨'
//     ],
//     [
//         '술',
//         '중식',
//         '한식'
//     ],
//     [
//         '카페'
//     ]
// ];

// 여기까지

const MeetView2 = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mainLife, setMainLife] = useState([]);
  const [secondLife, setSecondLife] = useState([]);
  const [area, setArea] = useState([]);
  const [sendLife, setSendLife] = useState([]);
  const [sendArea, setSendArea] = useState([]);
  const [sendString, setSendString] = useState("");
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState("center");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const selectMainLife = (event) => {
  //     setMainLife(event.target.value);
  // };

  const selectArea = (event) => {
    setArea(event.target.value);
  };

  const selectSecondLife = (event) => {
    const inSubheader = event.target.value.indexOf("subheader") !== -1;
    if (inSubheader) {
      //  subheader가 선택되는 것을 방지한다.
    } else {
      setSecondLife(event.target.value);
    }
  };

  const sendData = () => {
    selectSendArea();
    selectSendLife();
    // console.log(secondlifes[0][0].text);
  };

  const selectSendLife = () => {
    const temp = secondLife;
    temp.sort(function (a, b) {
      return a - b;
    });
    setSendLife(temp);

    let lifeString = "";

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
        lifeString = lifeString + cate[i] + "!";
      }
    }

    // 여기 부분은 지역을 다중 선택함으로써 MeetResultView2에서 처리한다.
    // if(area !== '') {
    //     lifeString = lifeString + area;
    // }
    // console.log(lifeString);
    setSendString(lifeString);
  };

  const selectSendArea = () => {
    setSendArea(area);
  };

  // useEffect(() => {
  //     console.log("--- MeetView2 useEffect 부분입니다. ---")
  //     console.log("메인-서브 : " + secondLife);
  // }, [secondLife]);

  // useEffect(() => {
  //     console.log("--- MeetView2 useEffect 부분입니다. ---")
  //     console.log("보낼 데이터 : " + sendLife)
  // }, [sendLife]);

  // useEffect(() => {
  //     console.log("--- MeetView2 useEffect 부분입니다. ---")
  //     console.log("지역 : " + area)
  // }, [area])

  return (
    <div>
      {/* <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Area</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    // multiple
                    value={area}
                    onChange={selectArea}
                    input={<Input />}
                    // renderValue={(selected) => selected.join(', ')}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                >
                    {areas.map((one) => (
                        <MenuItem key={one} value={one}>
                            <Checkbox checked={area.indexOf(one) > -1}/>
                            <ListItemText primary={one} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Area</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={area}
          onChange={selectArea}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          // renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {areas.map((one) => (
            <MenuItem key={one} value={one}>
              <Checkbox checked={area.indexOf(one) > -1} />
              <ListItemText primary={one} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={classes.button}
        variant="outlined"
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
      <Button className={classes.button} variant="contained" onClick={sendData}>
        검색!!
      </Button>
      <br />
      {/* 이 부분 막 때려넣은 곳 */}
      <div align="center">
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="mapType"
            name="maptype1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="center"
              control={<Radio />}
              label="중심지 기준"
            />
            <FormControlLabel
              value="max"
              control={<Radio />}
              label="선택된 지역들만"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"약속잡기 검색 방법"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Area를 1개부터 여러 개까지 선택이 가능합니다.
              <br />
              라이프스타일을 선택하고, 아래의 옵션 1개를 선택하여 검색을 합니다.
              <br />
              중심지 기준 : 중심지가 포함된 자치구에서 검색하여 추천
              <br />
              선택된 지역들만 : 선택된 자치구 중 가장 많은 장소가 검색된 곳을
              추천
              <br />
              최대 100개까지의 장소가 검색됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <div align="right" style={{paddingRight: "10px"}}>
                <Button variant="contained" color="primary" onClick={sendData}>
                    적용!!
                </Button>
            </div> */}
      <hr />
      <MeetResultView2
        sendArea={sendArea}
        sendLife={sendLife}
        sendString={sendString}
        value={value}
      />
    </div>
  );
};

export default MeetView2;
