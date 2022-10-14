import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useFonts } from "expo-font";
import { SharedElement } from "react-native-shared-element";

const CourseCard = ({
  sharedElementPrefix,
  category,
  containerStyle,
  onPress,
}) => {
  const [loaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={{
        width: 150,
        height: 200,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Image background  */}
      <SharedElement
        id={`${sharedElementPrefix}-CourseCard-Bg-${category?.id}`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SIZES.radius,
          }}
        />
      </SharedElement>

      {/* Title */}
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 8,
        }}
      >
        <SharedElement
          id={`${sharedElementPrefix}-CourseCard-Title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Text
            style={{
              position: "absolute",
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >
            {category?.title}
          </Text>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;
