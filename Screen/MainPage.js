import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { ScreenOrientation } from 'expo';

async function changeScreenOrientation() {
  await ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
}

export default class RegistrationScreen extends React.Component {
componentDidMount(){
 ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);

} 
componentWillUnmount(){
  ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
}


    render(){
  return (
    <View   style={styles.container}>
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
