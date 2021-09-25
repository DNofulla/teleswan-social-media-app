import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  const {
    onPress,
    title = "Log in",
    mt = 10,
    mh = 0,
    pv = 10,
    ph = 10,
    borderRadius = 0,
    bgcolor = "black",
    color = "white",
  } = props;

  return (
    <Pressable
      style={StyleSheet.flatten([
        styles.button,
        {
          marginTop: mt,
          marginHorizontal: mh,
          paddingVertical: pv,
          paddingHorizontal: ph,
          backgroundColor: bgcolor,
          borderRadius: borderRadius,
        },
      ])}
      onPress={onPress}
    >
      <Text style={StyleSheet.flatten([styles.text, { color: color }])}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.15,
  },
});
