import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";
export default class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false
    };
  }
  registrationForm = (email, password, confirmPassword) => {
    if (password === confirmPassword) {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ isLoading: false });
            Alert.alert("", "Registration succesful.");
            Actions.auth();
          })
          .catch(error => {
            switch (error.code) {
              case "auth/invalid-email":
                Alert.alert("", "Invalid Email adress !");
                this.setState({ isLoading: false });
                break;
              case "auth/email-already-in-use":
                Alert.alert("", "Email already in use !");
                this.setState({ isLoading: false });
                break;
            }
          });
      } catch (err) {
        Alert.alert("Error : ", err);
        this.setState({ isLoading: false });
      }
    } else if (password.length < 6) {
      alert("Password to short");
      this.setState({ isLoading: false });
    } else if (password != confirmPassword) {
      Alert.alert("", "Wrong Password");
      this.setState({ isLoading: false });
    }
  };
  renderButton() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" animating={true} />;
    }
  }
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
        {this.renderButton()}
        {this.renderError}
        <View>
          <TouchableOpacity
            onPress={() => {
              this.registrationForm(
                this.state.email,
                this.state.password,
                this.state.confirmPassword
              );
              this.setState({ isLoading: true });
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
