import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useFonts } from "expo-font";

const CourseCard = ({ category, containerStyle }) => {
  const [loaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity>
      <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        style={{
          height: 150,
          width: 200,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          justifyContent: "flex-end",
          ...containerStyle,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
          }}
        >
          {category?.title}
        </Text>
      </ImageBackground>
      {/* <Text>CourseCard</Text> */}
    </TouchableOpacity>
  );
};

export default CourseCard;
