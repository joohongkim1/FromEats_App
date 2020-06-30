import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Redux 관련 불러오기
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import rootReducer, { rootSaga } from "./modules/index";

import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import thunk from "redux-thunk";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Recipe Korea",
  },
});

// const sagaMiddleware = createSagaMiddleware();

// 스토어 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,

  document.getElementById("root")
);
