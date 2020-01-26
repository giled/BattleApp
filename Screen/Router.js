import React from "react";
import { Scene, Router } from "react-native-router-flux";
import LoginScreen from "./LoginScreen";
import MainPage from "./MainPage";
import RegistrationScreen from "./RegistrationScreen";
const ReactRouter = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar={true}>
        <Scene key="auth">
          <Scene
            key="login"
            component={LoginScreen}
            title="Please Login"
            initial
          />
        </Scene>
        <Scene key="reg">
          <Scene
            key="registration"
            title="Registration"
            component={RegistrationScreen}
          />
        </Scene>
        <Scene key="main">
          <Scene key="mainPage" component={MainPage} hideNavBar={true} />
        </Scene>
      </Scene>
    </Router>
  );
};

export default ReactRouter;
