import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const LineDivider = ({ lineStyle }) => {
  return (
    <View
      style={{
        height: 2,
        width: "100%",
        backgroundColor: COLORS.gray20,
        ...lineStyle,
      }}
    >
      <Text>LineDivider</Text>
    </View>
  );
};

export default LineDivider;

const styles = StyleSheet.create({});
