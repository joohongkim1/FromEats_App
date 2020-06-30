import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../components/Common/Button";

const AuthFormBlcok = styled.div`
  h3 {
    margin: 0;
    color: gray;
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  font-family: "Recipe Korea";
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid gray;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
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
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
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
    const { email, username, password, passwordConfirm } = this.state;

    const signupInfo = {
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password,
      password2: this.state.passwordConfirm,
    };

    const signup_info = {
      method: "POST",
      body: JSON.stringify(signupInfo),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://i02a205.p.ssafy.io:8001/rest-auth/registration/", signup_info)
      .then((res) => {
        console.log(res);
        this.props.history.push("/login");
        window.location.reload();
        return res.json();
      })
      .then(alert("가입이 완료되었습니다."))
      .then();
  };
  handleSocialSubmit = (e) => {
    e.preventDefault();
    fetch("http://i02a205.p.ssafy.io:8001/social/google/login/")
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
          회원가입
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
              marginTop: "30px",
              fontSize: "15px",
              marginLeft: "10%",
            }}
          />
          {/* {this.type === 'register' && ( */}
          <StyledInput
            autoComplete="email"
            name="email"
            placeholder="이메일"
            type="email"
            onChange={this.handleChange}
            value={this.state.email}
            style={{
              width: "300px",
              marginTop: "30px",
              fontSize: "15px",
              marginLeft: "10%",
            }}
          />
          {/* )} */}
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            style={{
              width: "300px",
              marginTop: "30px",
              fontSize: "15px",
              marginLeft: "10%",
            }}
          />
          {/* {this.type === 'register' && ( */}
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={this.handleChange}
            value={this.state.passwordConfirm}
            style={{
              width: "300px",
              marginTop: "30px",
              fontSize: "15px",
              marginLeft: "10%",
            }}
          />
          {/* )} */}

          {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
          <ButtonWithMarginTop
            style={{
              marginTop: "3rem",
              width: "200px",
              height: "50px",
              float: "center",
              marginLeft: "24%",
              fontSize: "18px",
              backgroundColor: "orange",
              color: "black",
              fontFamily: "Recipe Korea",
            }}
            onClick={this.handleSubmit}
          >
            회원가입
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
