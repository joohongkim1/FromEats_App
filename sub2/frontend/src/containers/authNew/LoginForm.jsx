import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../components/Common/Button";

const AuthFormBlcok = styled.div`
  font-family: "Recipe Korea";
  h3 {
    margin: 0;
    color: gray;
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  font-family: "Recipe Korea";
  border: none;
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid gray;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 1rem;
  border: none;
  border-radius: 4px;
  text-decoration: "none";
  text-align: center;
  a {
    color: white;
    &:hover {
      color: gray;
    }
  }
`;
const SocailLogin = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: gray;
    text-decoration: underline;
    &:hover {
      color: gray;
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

class RegisterForm extends Component {
  // const text = textMap[type];
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(this.state);
  };

  //서버로 가입 양식 제출
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    const loginInfo = {
      username: this.state.username,
      password: this.state.password,
    };

    const login_info = {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://i02a205.p.ssafy.io:8001/rest-auth/login/", login_info)
      .then((res) => {
        const reader = res.body.getReader();
        const stream = new ReadableStream({
          start(controller) {
            // 아래 함수는 각 data chunck를 다룬다.
            function push() {
              // "done"은 Boolean 이며 value는 "Uint8Array 이다."
              reader.read().then(({ done, value }) => {
                // 더이상 읽은 데이터가 없는가?
                if (done) {
                  // 브라우저에게 데이터 전달이 끝났다고 알린다.
                  controller.close();
                  return;
                }

                // 데이터를 얻고 컨트롤러를 통하여 그 데이터를 브라우저에 넘긴다.
                controller.enqueue(value);
                push();
              });
            }

            push();
          },
        });
        console.log(res);

        window.localStorage.setItem("userInfo", username);
        window.localStorage.setItem("login", true);
        this.props.history.push("/lifestyle");
        window.location.reload();
        return;
      })
      .then(alert("로그인되었습니다."));
  };
  handleSocialSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/social/google/login/")
      .catch(alert("error"))
      .then(alert("가입이 완료되었습니다."));
  };
  render() {
    return (
      <div>
        <h3
          style={{
            fontFamily: "Recipe Korea",
            textAlign: "center",
            fontSize: "25px",
            marginTop: "100px",
          }}
        >
          로그인
        </h3>
        <AuthFormBlcok>
          {/* <h3>{text}</h3> */}
          {/* <form onSubmit={this.handleSubmit}> */}
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="아이디"
            onChange={this.handleChange}
            value={this.state.username}
            style={{
              width: "300px",
              marginTop: "50px",
              fontSize: "15px",
              marginLeft: "10%",
            }}
          />
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            style={{
              width: "300px",
              marginTop: "50px",
              fontSize: "15px",
              marginLeft: "10%",
            }}
          />

          {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
          <ButtonWithMarginTop
            // cyan

            style={{
              marginTop: "3rem",
              width: "200px",
              height: "50px",
              float: "center",
              marginLeft: "24%",
              fontSize: "15px",
              backgroundColor: "orange",
              color: "black",
            }}
            onClick={this.handleSubmit}
          >
            로그인
          </ButtonWithMarginTop>
          {/* <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }} onClick={this.handleSubmit}>
                            구글로그인
                    </ButtonWithMarginTop> */}
          {/* </form> */}
        </AuthFormBlcok>
      </div>
    );
  }
}

export default RegisterForm;
