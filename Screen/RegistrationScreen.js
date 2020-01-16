import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";
export default class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  registrationForm = (email, password, confirmPassword) => {
    try {
      if (password === confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(alert("Registration succed"))
          .catch(error => {
            alert(error.message);
          });
      } else {
        alert("Wrong Password");
      }
    } catch (err) {
      alert(err);
    }
  };
  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text>{(this.props.error, console.log(this.props.error))}</Text>
        </View>
      );
    }
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            placeholder="Password"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            secureTextEntry={true}
            placeholder="Confirm Password"
            style={styles.textInput}
          />
        </View>
        {this.renderError}
        <View>
          <TouchableOpacity
            onPress={() => {
              this.registrationForm(
                this.state.email,
                this.state.password,
                this.state.confirmPassword
              );
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Register</Text>
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
