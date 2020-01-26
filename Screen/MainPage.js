import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import { ScreenOrientation } from "expo";
import firebase from "firebase";
import {
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
const imageSource = require("../assets/map.jpg");
const airdrop = require("../assets/test.png");
const warimage = require("../assets/war.png");

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
    //console.log("Coordinates", `x coord = ${evt.nativeEvent.locationX}`);
    //console.log("Coordinates", `y coord = ${evt.nativeEvent.locationY}`);
    const user = firebase.auth().currentUser.uid;
    let cordinates = {
      xcor: evt.nativeEvent.locationX + 50,
      ycor: evt.nativeEvent.locationY - 10,
      selectedImage: this.state.newImage
    };

    // console.log(this.state.newImage);

    array.push(cordinates);
    firebase
      .database()
      .ref(`/cordinates/1/`)
      .push(cordinates);
    this.setState({
      //  array: array
    });
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
    StatusBar.setHidden(true);
  }
  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }
  handlerClick(key) {
    console.log(key);
  }

  render() {
    let array = [];
    const user = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/cordinates/1/`)

      .on("value", snapshot => {
        if (snapshot && snapshot.exists()) {
          snapshot.forEach(child => {
            // console.log(child.key);
            array.push(
              <View
                key={child.key}
                style={{
                  position: "absolute",
                  flex: 1,
                  left: child.val().xcor,
                  top: child.val().ycor,
                  right: child.val().xcor,
                  bottom: child.val().ycor
                }}
              >
                <TouchableOpacity onPress={this.handlerClick(child.key)}>
                  <Image
                    source={child.val().selectedImage}
                    style={{ resizeMode: "cover", width: 50, height: 50 }}
                  ></Image>
                </TouchableOpacity>
              </View>
            );
          });
        }
      });
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.image}
            onLongPress={evt => this.handlePress(evt)}
          >
            <Image style={styles.image1} source={imageSource}></Image>
          </TouchableOpacity>
          {this.state.array.length != 0 ? (
            <View style={styles.icon}>{array}</View>
          ) : (
            <View></View>
          )}
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
