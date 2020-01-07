import React from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./Screen/LoginScreen";
import RegistrationScreen from "./Screen/RegistrationScreen";
import MainPage from "./Screen/MainPage";
import firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";
const NavigationApp = createStackNavigator(
  {
    Home: { screen: LoginScreen },
    Register: { screen: RegistrationScreen },
    MainPage: { screen: MainPage }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppContainer = createAppContainer(NavigationApp);

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAeUlGmBDezMKtfHQpoMGdmBzvw6lToEto",
      authDomain: "battlemap-c5355.firebaseapp.com",
      databaseURL: "https://battlemap-c5355.firebaseio.com",
      projectId: "battlemap-c5355",
      storageBucket: "battlemap-c5355.appspot.com",
      messagingSenderId: "1041382984979",
      appId: "1:1041382984979:web:33d3e38a6a867374d7dee6"
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonContainer: {
    alignItems: "center",
    padding: 0,
    borderWidth: 1,
    borderColor: "#03F8FF",
    backgroundColor: "#03F8FF",
    marginTop: 10,
    height: "auto",
    width: 300,
    borderRadius: 50
  },
  buttonText: {
    fontSize: 30
  },
  textInput: {
    padding: 5,
    borderColor: "black",
    marginBottom: 10,
    borderWidth: 1,
    width: 300
  }
});
