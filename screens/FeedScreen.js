import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FeedScreen = ({ history }) => {
  const handleLogout = async () => {
    try {
      let res = await fetch("http://192.168.1.148:8080/users/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await AsyncStorage.removeItem("@session");

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed Screen</Text>
      <Button
        mh={25}
        mt={10}
        pv={10}
        ph={80}
        title="Log Out"
        onPress={handleLogout}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {},
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
