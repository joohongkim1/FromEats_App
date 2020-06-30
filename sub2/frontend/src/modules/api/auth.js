import HTTP from "./client";

// 로그인
export async function login(username, password) {
  console.log("publish");
  let data = JSON.stringify({
    username: username,
    password: password,
  });
  let url = "/rest-auth/login";
  return HTTP.post(url, data, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(function (response) {
      if (!response) {
        return Promise.reject(response.statusText);
      }

      // localStorage.setItem('token', response.data.list[0].toString());

      // sessionStorage.setItem(
      //   "uid", response.data.list[1].toString()
      // );

      // sessionStorage.setItem(
      //   "userInfo", response.data.list[2].toString()
      // );

      return response;
    })
    .catch(() => {
      return Promise.reject("Backend not reachable");
    });
}

// 회원 가입 함수
export async function register(username, email, password, passwordConfirm) {
  let data = JSON.stringify({
    username: username,
    email: email,
    password1: password,
    password2: passwordConfirm,
  });
  return HTTP.post(
    "/rest-auth/registration",
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
    },
    { withCredentials: true }
  )
    .then(function (response) {
      if (!response) {
        return Promise.reject(response.statusText);
      }

      return response.data.success;
    })
    .catch((e) => {
      console.log("aaaaaaaaaaa");
      return Promise.reject("Backend not reachable");
    });
}

// export const login = ({ username, password }) =>
//   client.post('/rest-auth/login', { username, password });

// // 회원가입
// export const register = ({ username, email, password1, password2 }) =>
//   HTTP.post('/rest-auth/registration/', { username, email, password1, password2 });

// 로그인 상태 확인
export async function check() {
  return (
    HTTP.get("/rest-auth/user/"),
    null,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    },
    { withCredentials: true }

      .then(function (response) {
        if (!response) {
          return Promise.reject(response.statusText);
        }

        return response.data.success;
      })
      .catch((e) => {
        console.log("aaaaaaaaaaa");
        return Promise.reject("Backend not reachable");
      })
  );
}
