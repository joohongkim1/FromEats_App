import React, { useEffect, useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../modules/auth/authRegister';
import AuthForm from './AuthForm';
import { connect } from 'react-redux';
// import { check } from '../../modules/auth/user';
import { withRouter } from 'react-router-dom';

class RegisterForm extends Component {
  // const [error, setError] = useState(null);
  // const dispatch = useDispatch();
  // // const { form, auth, authError } = useSelector(({auth}) => ({
  // //   form: auth.register,
  // //   auth: auth.auth,
  // //   authError: auth.authError,
  // //   // user: user.user,
  // // }));


  // // 폼 등록 이벤트 핸들러
  // const onSubmit = e => {
  //   e.preventDefault();
  //   const { username, email, password, passwordConfirm } = form;
  //   // 하나라도 비어있다면
  //   if ([username, email, password, passwordConfirm].includes('')) {
  //     setError('빈 칸을 모두 입력하세요.');
  //     return;
  //   }
  //   // 비밀번호가 일치하지 않는다면

  //   dispatch(registerRequest({ username, email, password, passwordConfirm }));
  // };

  // // // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  // // useEffect(() => {
  // //   dispatch(initializeForm('register'));
  // // }, [dispatch]);

  // // 회원가입 성공 / 실패 처리
  // useEffect(() => {
  //   if (authError) {
  //     // 계정명이 이미 존재할 때
  //     if (authError.response === 409) {
  //       setError('이미 존재하는 계정명입니다.');
  //       return;
  //     }
  //     // 기타 이유
  //     setError('회원가입 실패');
  //     return;
  //   }

  //   if (auth) {
  //     console.log('회원가입 성공');
  //     console.log(auth);
  //     // dispatch(check());
  //   }
  // }, [auth, authError, dispatch]);

  // // user 값이 잘 설정되었는지 확인
  // useEffect(() => {
  //   if (user) {
  //     console.log('check API 성공');
  //     console.log(user);
  //     history.push('/'); // 홈 화면으로 이동
  //   }
  // }, [history, user]);

  handleRegister = (username, email, password, passwordConfirm) => {
    return this.props.registerRequest(username, email, password, passwordConfirm).then(
      () => {
        if (this.props.status === "SUCCESS") {
          // Materialize.toast('Success! Please log in.', 2000);
          // this.props.history.push('/login');
          console.log('Success')
          return true;
        } else {
          /*
              ERROR CODES:
                  1: BAD USERNAME
                  2: BAD PASSWORD
                  3: USERNAME EXISTS
          */
          let errorMessage = [
            'Invalid Username',
            'Password is too short',
            'Username already exists'
          ];

          // let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
          // Materialize.toast($toastContent, 2000);
          console.log(errorMessage[this.props.errorCode - 1])
          return false;
        }
      }
    );
  }
  render() {
  return (
    <AuthForm
      type="register"
      onRegister={this.handleRegister}
    />
  );
  }
};

const mapStateToProps = (state) => {
  return {
    status: state.authentication.register.status,
    errorCode: state.authentication.register.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (username, email, password, passwordConfirm) => {
      return dispatch(registerRequest(username, email, password, passwordConfirm));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);