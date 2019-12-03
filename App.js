import React from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import LoginScreen from './Screen/LoginScreen'
import RegistrationScreen from './Screen/RegistrationScreen'
import MainPage from './Screen/MainPage'
const NavigationApp= createStackNavigator({
  Home : {screen: LoginScreen},
  Register : {screen : RegistrationScreen},
  MainPage : {screen : MainPage}
});
const AppContainer=createAppContainer(NavigationApp)

export default class App extends React.Component {
  render(){
  return (
  <AppContainer/>

  );
}
}

const styles = StyleSheet.create({
  container: {
    padding : 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  buttonContainer: {
    alignItems : 'center',
    padding : 0,
    borderWidth : 1, 
    borderColor: '#03F8FF' ,
    backgroundColor : '#03F8FF',
    marginTop:10,
    height :'auto',
    width : 300,
    borderRadius: 50,

  },
  buttonText : {
    fontSize : 30,

  },
  textInput:{
    padding : 5 ,
   borderColor: 'black' ,
   marginBottom : 10, 
   borderWidth : 1 ,
   width : 300
  }
  
});
