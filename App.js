import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FeedScreen from "./screens/FeedScreen";
import LandingScreen from "./screens/LandingScreen";
import { NativeRouter, Switch, Route, Redirect } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isAuth = async () => {
  try {
    const session = await AsyncStorage.getItem("@session");

    if (session == null || session == undefined) {
      return false;
    }

    console.log("Session ID :" + session._id);
    console.log(new Date().getTime());
    console.log(session.expires);
    if (session.expires < new Date().getTime() / 1000) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? <Component {...props} /> : <Redirect to="/" />
    }
  ></Route>
);

const App = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <StatusBar animated={true} hidden={false} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <LandingScreen {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <LoginScreen {...props} />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <RegisterScreen {...props} />}
          />
          <AuthRoute exact path="/feed" component={FeedScreen} />
        </Switch>
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323232",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

export default App;
