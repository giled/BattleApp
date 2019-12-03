import React from 'react';
import { StyleSheet, Text, View, TextInput, Button ,TouchableOpacity } from 'react-native';


export default class RegistrationScreen extends React.Component {
  render(){
  
  return (
    <View style={styles.container}>
    <Text>Main Page</Text>
  
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
    
  }
  
});
