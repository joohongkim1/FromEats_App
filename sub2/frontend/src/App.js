import React from "react";
import { Route, Switch } from "react-router-dom";
import RegisterForm from "./containers/authNew/RegisterForm";
import LoginForm from "./containers/authNew/LoginForm";
import MapPage from "./pages/MapPage";
// import StorePage from "./components/Store/StorePage";
import StorePage from "./pages/StorePage";
import MyPage from "./pages/MyPage";
import MeetPage from "./pages/MeetPage";
import Entrance from "./pages/Entrance";
import Detail from "./components/Store/DetailPage/StoreDetail";
// import LifePage from "./pages/LifePage";
import Review from "./components/Store/DetailPage/Review";
import LifePage from "./components/LifeStyle/LifePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={Entrance}></Route>
        <Route path="/lifestyle/:category?" component={LifePage}></Route>
        <Route path="/store/:function?" component={StorePage}></Route>
        <Route path="/review/:id" component={Review}></Route>
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/register" component={RegisterForm}></Route>
        <Route path="/map" component={MapPage}></Route>
        <Route path="/meet" component={MeetPage}></Route>
        <Route path="/mypage" component={MyPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
