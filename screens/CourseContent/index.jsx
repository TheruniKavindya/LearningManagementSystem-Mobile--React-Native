import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { SharedElement } from "react-native-shared-element";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const CourseContent = ({ navigation, route }) => {
  const { category, sharedElementPrefix } = route.params;
  function renderHeader() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 250,
          overflow: "hidden",
        }}
      >
        {/* Background Image  */}
        <SharedElement
          id={`${sharedElementPrefix}-CourseCard-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>

        {/* Title  */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 70,
            left: 30,
          }}
        >
          <SharedElement
            id={`${sharedElementPrefix}-CourseCard-Title-${category.id}`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <Text
              style={{
                position: "absolute",
                color: COLORS.white,
                ...FONTS.h1,
              }}
            >
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>

        {/* Back Button  */}
        {/* <Animated.View>
            <IconButton icon={}>

            </IconButton>
        </Animated.View> */}
      </Animated.View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header  */}
      {renderHeader()}
    </View>
  );
};

CourseContent.SharedElement = (route, otherRoute, showing) => {
  const { category, SharedElementPrefix } = route.params;
  return [
    {
      id: `${sharedElementPrefix}-CourseCard-Bg-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-CourseCard-Title-${category?.id}`,
    },
  ];
};

export default CourseContent;

const styles = StyleSheet.create({});
