import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native";
import { ScreenOrientation } from "expo";
import * as firebase from "firebase";
const s = "n";
const imageSource = require("../assets/map.jpg");
const airdrop = require("../assets/test.png");
const warimage = require("../assets/war.png");
const firebaseConfig = {
  apiKey: "AIzaSyAeUlGmBDezMKtfHQpoMGdmBzvw6lToEto",
  authDomain: "battlemap-c5355.firebaseapp.com",
  databaseURL: "https://battlemap-c5355.firebaseio.com",
  projectId: "battlemap-c5355",
  storageBucket: "battlemap-c5355.appspot.com",
  messagingSenderId: "1041382984979",
  appId: "1:1041382984979:web:33d3e38a6a867374d7dee6",
  measurementId: "G-N2W1JJ8G46"
};

export default class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      xcor: null,
      ycor: null,
      array: [],
      count: 0,
      selectedImage: "",
      newImage: warimage
    };
  }
  handlePress(evt) {
    let array = this.state.array;
    console.log("Coordinates", `x coord = ${evt.nativeEvent.locationX}`);
    console.log("Coordinates", `y coord = ${evt.nativeEvent.locationY}`);
    let cordinates = {
      xcor: evt.nativeEvent.locationX + 50,
      ycor: evt.nativeEvent.locationY - 10,
      selectedImage: this.state.newImage
    };

    array.push(cordinates);
    this.setState({
      //  array: array
    });
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }
  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    let array = [];
    let count = 0;
    if (this.state.array.length != 0) {
      count = count + 1;
      console.log(this.state.array.length);
      this.state.array.map(res => {
        console.log(res);
        array.push(
          <View
            key={count}
            style={{
              position: "relative",
              flex: 1,
              left: res.xcor,
              top: res.ycor,
              right: res.xcor,
              bottom: res.ycor
            }}
          >
            <Image
              source={res.selectedImage}
              style={{ resizeMode: "cover", width: 35, height: 35 }}
            ></Image>
          </View>
        );
      });
    }

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.image}
            onPress={evt => this.handlePress(evt)}
          >
            <Image style={styles.image1} source={imageSource}></Image>
          </TouchableOpacity>
          {this.state.array.length != 0 ? <View>{array}</View> : <View></View>}
          <ScrollView style={styles.Scroll}>
            <TouchableOpacity
              onPress={() => this.setState({ newImage: warimage })}
            >
              <Image source={warimage} style={styles.ScrollImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ newImage: airdrop })}
            >
              <Image source={airdrop} style={styles.ScrollImage}></Image>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 1,
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    // flex : 1,
    position: "absolute",
    width: "90%",
    height: "100%",
    bottom: 0,
    right: 0,
    resizeMode: "stretch",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d6d7da"
  },
  image1: {
    width: "100%",
    height: "100%"
  },
  Scroll: {
    position: "absolute",
    width: "10%",
    height: "100%",
    left: 2,
    resizeMode: "stretch",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d6d7da"
  },
  ScrollImage: {
    flex: 1,

    width: 60,
    height: 60,
    //width: "10%",
    resizeMode: "contain",

    borderColor: "#d6d7da"
  }
});
