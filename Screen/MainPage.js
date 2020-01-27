import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert
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
      all_base: [],
      count: 0,
      selectedImage: "",
      showView: true,

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
    const iconRef = firebase.database().ref(`/cordinates/1/`);
    this.listenForFireBase(iconRef);
  }
  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }
  listenForFireBase = iconRef => {
    iconRef.on("value", snapshot => {
      var aux = [];
      if (snapshot && snapshot.exists()) {
        snapshot.forEach(child => {
          aux.push(
            <View
              key={child.key}
              style={{
                position: "relative",
                flex: 1,
                left: child.val().xcor,
                top: child.val().ycor,
                right: child.val().xcor,
                bottom: child.val().ycor
              }}
              onStartShouldSetResponder={() => this.handlerClick(child.key)}
            >
              <Image
                source={child.val().selectedImage}
                style={{ resizeMode: "cover", width: 40, height: 40 }}
              />
            </View>
          );
        });
      }
      this.setState({ all_base: aux });
    });
  };

  handlerClick(key) {
    console.log(key);
    Alert.alert(
      "Alert",
      "Remove position?",
      [
        {
          text: "NO",
          onPress: () => console.log("ok")
        },
        {
          text: "YES",
          onPress: () =>
            firebase
              .database()
              .ref(`/cordinates/1/`)
              .child(key)
              .remove()
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    let array = [];
    const user = firebase.auth().currentUser.uid;
    let show_fireBase = this.state.all_base.map(val => {
      console.log(val);
      return val;
    });
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            onLongPress={evt => this.handlePress(evt)}
            style={styles.image}
            activeOpacity={1}
          >
            <Image style={styles.image1} source={imageSource}></Image>
          </TouchableOpacity>
          <View>{show_fireBase}</View>
          {/* {this.state.array.length != 0 ? <View>{array}</View> : <View></View>} */}
        </View>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 1,
    flex: 1
    //backgroundColor: "#fff"
  },
  image: {
    flex: 5,
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
