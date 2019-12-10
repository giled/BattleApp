import React from 'react';
import { StyleSheet, Text, View, TextInput ,TouchableOpacity } from 'react-native';


export default class RegistrationScreen extends React.Component {
  render(){
    const {navigate}=this.props.navigation;
  return (
    <View style={styles.container}>
    <View>

    <TextInput placeholder="Nickname" style={styles.textInput}/>
    <TextInput placeholder="Email" style={styles.textInput}/>
    <TextInput secureTextEntry={true} placeholder="Password" style={styles.textInput}/>
    <TextInput secureTextEntry={true} placeholder="Confirm Password" style={styles.textInput}/>
    </View>
    <View>
    

      <TouchableOpacity style={styles.buttonContainer} onPress={
        () =>navigate("Home")
      }>
      <Text style={styles.buttonText}>
        Register
      </Text>
      </TouchableOpacity>
      
    </View>

  
  </View>
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
