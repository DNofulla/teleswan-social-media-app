import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Button from "../components/Button";

const LandingScreen = ({ history }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/TeleSwanMediaLogo-DarkMode.png")}
            />
          </View>
        </View>

        <View style={{ flexDirection: "column" }}>
          <Button
            mh={25}
            mt={20}
            pv={15}
            ph={36}
            bgcolor="black"
            title="Already have an account? Log In!"
            onPress={() => history.push("/login")}
          />
          <Button
            mh={25}
            mt={20}
            pv={15}
            ph={36}
            bgcolor="white"
            color="black"
            title="Don't have an account? Sign Up!"
            onPress={() => history.push("/register")}
          />
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: 350,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    borderRadius: 5,
  },
});
