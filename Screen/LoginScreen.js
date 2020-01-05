import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { emailChanged } from "../actions";
class LoginScreen extends React.Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  constructor() {
    super();
    this.state = {
      loginName: "",
      loginPassword: "",
      nickname: "test",
      password: "test"
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const check = () => {
      if (
        this.state.loginName === this.state.nickname &&
        this.state.loginPassword === this.state.password
      ) {
        return navigate("MainPage"), console.log("yes");
      } else {
        return navigate("MainPage"), console.log("yes");
      }
    };
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Nickname"
            onChangeText={
              (loginName => this.setState({ loginName }),
              this.onEmailChange.bind(this))
            }
            value={(this.state.loginName, this.props.email)}
            style={styles.textInput}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            onChangeText={loginPassword => this.setState({ loginPassword })}
            value={this.state.loginPassword}
            style={styles.textInput}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.buttonContainer} onPress={check}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.buttonText}
              onPress={() => navigate("Register")}
            >
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
const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
};

export default connect(mapStateToProps, { emailChanged })(LoginScreen);
