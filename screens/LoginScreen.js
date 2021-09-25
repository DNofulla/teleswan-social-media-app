import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";

const LoginScreen = ({ history }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsernameChange = (text) => {
    setUsername(text);
    console.log("Username: " + text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    console.log("Password: " + text);
  };

  const handleLogIn = async () => {
    let hasError = false;

    if (!username || !password) {
      Alert.alert("An error has occurred!", "Don't leave Empty Fields!", [
        {
          text: "OK",
          onPress: () => console.log("Error Alert Closed!"),
        },
      ]);
      hasError = true;
    }

    if (hasError === false) {
      try {
        let res = await fetch("http://192.168.1.148:8080/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        const json = await res.json();

        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem("@session", jsonValue);
        } catch (e) {
          console.log(`Error storing session to AsyncStorage: \n${e}`);
        }

        setUsername("");
        setPassword("");
        if (json.message) {
          Alert.alert("An error has occurred!", json.message, [
            {
              text: "OK",
              onPress: () => console.log("Error Alert Closed!"),
            },
          ]);
        } else {
          history.push("/feed");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("An error has occurred!", error.error, [
          {
            text: "OK",
            onPress: () => console.log("Error Alert Closed!"),
          },
        ]);
        setUsername("");
        setPassword("");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                }}
                source={require("../assets/TeleSwanMediaLogo-DarkMode.png")}
              />
            </View>
            <TextInput
              value={username}
              onChangeText={(text) => handleUsernameChange(text)}
              placeholderTextColor="black"
              placeholder="Username"
              style={styles.inputForm}
            />
            <TextInput
              value={password}
              onChangeText={(text) => handlePasswordChange(text)}
              secureTextEntry={true}
              placeholderTextColor="black"
              placeholder="Password"
              style={styles.inputForm}
            />
          </View>

          <View style={{ flexDirection: "column" }}>
            <Button
              mh={25}
              mt={5}
              pv={10}
              ph={30}
              title="Log In"
              onPress={handleLogIn}
            />
            <Button
              mh={25}
              mt={15}
              pv={10}
              ph={30}
              bgcolor="white"
              color="black"
              title="Already have an account? Sign Up!"
              onPress={() => history.push("/register")}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputForm: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: 300,
    color: "black",
    borderColor: "white",
    fontSize: 15,
    backgroundColor: "white",
    marginVertical: 10,
  },
  innerContainer: {
    width: 350,
    height: 490,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    marginBottom: 70,
  },
  logInQ: {
    fontSize: 14,
    color: "white",
    marginTop: 15,
  },
});
