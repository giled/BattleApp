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

const imageSource = require("../assets/map.jpg");

export default class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      xcor: null,
      ycor: null,
      array: [],
      count: 0
    };
  }
  handlePress(evt) {
    var array = this.state.array;
    var count = 0;
    console.log("Coordinates", `x coord = ${evt.nativeEvent.locationX}`);
    console.log("Coordinates", `y coord = ${evt.nativeEvent.locationY}`);
    var cordinates = {
      xcor: evt.nativeEvent.locationX + 50,
      ycor: evt.nativeEvent.locationY - 10
    };
    array.push(cordinates);
    this.setState({
      array: array
    });
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }
  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    var array = [];
    if (this.state.array.length != 0) {
      this.state.array.map(res => {
        array.push(
          <View
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
              source={require("../assets/war.png")}
              style={{ resizeMode: "cover", width: 35, height: 35 }}
            ></Image>
          </View>
        );
      });
    }

    console.log(array);
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
            <Image
              source={require("../assets/war.png")}
              style={styles.ScrollImage}
            ></Image>
            <Image
              source={require("../assets/war.png")}
              style={styles.ScrollImage}
            ></Image>
            <Image
              source={require("../assets/war.png")}
              style={styles.ScrollImage}
            ></Image>
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
