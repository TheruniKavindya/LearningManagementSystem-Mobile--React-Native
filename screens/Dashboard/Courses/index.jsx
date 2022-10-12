import React from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";

import { Shadow } from "react-native-shadow-2";
import { FlatList } from "react-native-gesture-handler";

// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";

import CourseCard from "../../../components/CourseCard";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../../../constants";
import Animated from "react-native-reanimated";
import { useFonts } from "expo-font";
import TextButton from "../../../components/TextButton";

const Search = () => {
  const scrollViewRef = React.useRef();

  function renderTopSearches() {
    const [loaded] = useFonts({
      "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
    });

    if (!loaded) {
      return null;
    }
    return (
      <View style={styles.functionStyle}>
        <Text style={styles.text}>Top Searches</Text>

        <FlatList
          horizontal
          data={dummyData.top_searches}
          listKey="TopSearch"
          // keyExtractor={(item) => `TopSearch-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <TextButton
              label={item.label}
              contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.top_searches.length - 1
                    ? SIZES.padding
                    : 0,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.gray10,
              }}
              labelStyle={styles.labelStyle}
            />
          )}
        />
      </View>
    );
  }

  function renderBrowsCourses() {
    return (
      <View style={styles.functionStyle}>
        <Text style={styles.text}>Brows Courses</Text>

        <FlatList
          data={dummyData.categories}
          numColumns={2}
          scrollEnabled={false}
          listKey="BrowsCourses"
          // keyExtractor={(item) => `BrowsCourses-${item.id}`}
          contentContainerStyle={{ marginTop: SIZES.radius }}
          renderItem={({ item, index }) => (
            <CourseCard
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                marginTop: SIZES.radius,
                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
              }}
            />
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          marginTop: 100,
          paddingBottom: 300,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        //onScroll
        //onScrollEndDrag
      >
        {/* Top Searches  */}
        {renderTopSearches()}

        {/* Brows Courses */}
        {renderBrowsCourses()}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginHorizontal: SIZES.padding,
    ...FONTS.h2,
  },
  functionStyle: {
    marginTop: SIZES.padding,
  },
  labelStyle: {
    color: COLORS.gray50,
    ...FONTS.h3,
  },
});

export default Search;
