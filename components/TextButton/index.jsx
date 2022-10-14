import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../../constants";

const TextButton = ({
  label,
  contentContainerStyle,
  labelStyle,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        ...contentContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
        }}
      >
        {label}
      </Text>

      {/* <Button
        style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}
        title={label}
      /> */}
    </TouchableOpacity>
  );
};

export default TextButton;
