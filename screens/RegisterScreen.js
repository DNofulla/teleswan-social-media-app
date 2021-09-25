import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Button from "../components/Button";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (text) => {
    setUsername(text);
    console.log("Username: " + text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    console.log("Password: " + text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    console.log("Email: " + text);
  };

  const toLowerCase = () => {
    setUsername(username.toLowerCase());
    setEmail(email.toLowerCase());
  };

  const handleRegister = async () => {
    let hasError = false;

    if (!username || !password || !email) {
      Alert.alert("An error has occurred!", "Don't leave Empty Fields!", [
        {
          text: "OK",
          onPress: () => console.log("Error Alert Closed!"),
        },
      ]);
      hasError = true;
    } else if (
      !/^[a-zA-Z0-9._][^~`!@#$%^&*()\-+={}\[ \];:'"<|>,/?]{4,24}$/.test(
        username
      )
    ) {
      Alert.alert(
        "An error has occurred!",
        "Please enter a username 4 to 24 characters long!",
        [
          {
            text: "OK",
            onPress: () => console.log("Error Alert Closed!"),
          },
        ]
      );
      hasError = true;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_\-+={}\[ \];:'"<|>,./?])(?=.*[a-zA-Z]).{8,24}$/.test(
        password
      )
    ) {
      Alert.alert(
        "An error has occurred!",
        "Please enter a password 8 to 24 characters long that contains at least 1 Upper Case letter, 1 Lower Case letter, 1 Number and 1 Special Character!",
        [
          {
            text: "OK",
            onPress: () => console.log("Error Alert Closed!"),
          },
        ]
      );
      hasError = true;
    } else if (
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email
      )
    ) {
      Alert.alert("An error has occurred!", "Please enter a valid email!", [
        {
          text: "OK",
          onPress: () => console.log("Error Alert Closed!"),
        },
      ]);
      hasError = true;
    }

    if (hasError === false) {
      try {
        let res = await fetch("http://192.168.1.148:8080/users/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            displayName: username,
            email: email,
            password: password,
          }),
        });

        let json = await res.json();
        console.log(json);

        Alert.alert("Success!", "Your account has been successfully created!", [
          {
            text: "OK",
            onPress: () => console.log("Success Alert Closed!"),
          },
        ]);
        setUsername("");
        setEmail("");
        setPassword("");
        history.push("/login");
      } catch (error) {
        console.error(error);
        Alert.alert(
          "An error has occurred!",
          "Please provide valid information!",
          [
            {
              text: "OK",
              onPress: () => console.log("Error Alert Closed!"),
            },
          ]
        );
        setUsername("");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.innerContainer}>
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
              onBlur={toLowerCase}
              placeholderTextColor="black"
              placeholder="Username"
              style={styles.inputForm}
            />
            <TextInput
              value={email}
              onBlur={toLowerCase}
              onChangeText={(text) => handleEmailChange(text)}
              placeholderTextColor="black"
              placeholder="Email Address"
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
              mt={10}
              pv={10}
              ph={120}
              title="Register"
              onPress={handleRegister}
            />
            <Button
              mh={25}
              mt={10}
              pv={10}
              ph={36}
              bgcolor="white"
              color="black"
              title="Already have an account? Log In!"
              onPress={() => history.push("/login")}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

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
  labelText: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 5,
    marginVertical: 0,
  },
  innerContainer: {
    width: 350,
    height: 550,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  logInQ: {
    fontSize: 14,
    color: "white",
    marginTop: 15,
  },
});
