import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../components/Common/Button'

const AuthFormBlcok = styled.div`  h3 {
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

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
    login: '로그인',
    register: '회원가입'
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

class AuthForm extends Component {
    // const text = textMap[type];
    state = {
      username:"",
      email: "",
      password:"",
      passwordConfirm: ""
    }
 
    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
 
    handleRegister = () => {
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;
        let passwordConfirm = this.state.passwordConfirm
 
        this.props.onRegister(username, email, password, passwordConfirm).then(
            (result) => {
                if(!result) {
                    this.setState({
                        username: '',
                        eamil: '',
                        password: '',
                        passwordConfirm: ''
                    });
                }
            }
        );
    }
    render(){
    return (
        <div>
          <h3>회원가입</h3>
            <AuthFormBlcok>
                {/* <h3>{text}</h3> */}
                <form onSubmit={this.handleRegister}>
                    <StyledInput
                        autoComplete="username"
                        name="username"
                        placeholder="아이디"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    {/* {this.type === 'register' && ( */}
                        <StyledInput
                            autoComplete="email"
                            name="email"
                            placeholder="이메일"
                            type="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    {/* )} */}
                    <StyledInput
                        autoComplete="new-password"
                        name="password"
                        placeholder="비밀번호"
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    {/* {this.type === 'register' && ( */}
                        <StyledInput
                            autoComplete="new-password"
                            name="passwordConfirm"
                            placeholder="비밀번호 확인"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.passwordConfirm}
                        />
                    {/* )} */}
                    
                    {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
                    <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>
                        회원가입
                    </ButtonWithMarginTop>
                </form>
                <Footer>
                    {/* {this.type === 'login' ? (
                        <Link to="/register">회원가입</Link>
                    ) : ( */}
                            <Link to="/login">로그인</Link>
                        {/* )} */}
                </Footer>
            </AuthFormBlcok>
        </div>
    )
  }

}

export default AuthForm;