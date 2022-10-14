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
import Animated, {
  event,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useFonts } from "expo-font";
import TextButton from "../../../components/TextButton";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();

  const scrollViewRef = React.useRef();

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffSet.y;
  });

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
        <Text style={styles.text}>My Courses</Text>

        <FlatList
          data={dummyData.categories}
          numColumns={2}
          scrollEnabled={false}
          listKey="BrowsCourses"
          // keyExtractor={(item) => `BrowsCourses-${item.id}`}
          contentContainerStyle={{ marginTop: SIZES.radius }}
          renderItem={({ item, index }) => (
            <CourseCard
              shareElementPrefix="Courses"
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                marginTop: SIZES.radius,
                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
              }}
              onPress={() =>
                navigation.navigate("CourseContent", {
                  category: item,
                  shareElementPrefix: "Courses",
                })
              }
            />
          )}
        />
      </View>
    );
  }

  function renderSearchBar() {
    const inputRange = [0, 55];

    const searchBarAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [55, 0],
          Extrapolate.CLAMP
        ),
        opacity: interpolate(
          scrollY.value,
          inputRange,
          [1, 0],
          Extrapolate.CLAMP
        ),
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
            height: 50,
          },
          searchBarAnimatedStyle,
        ]}
      >
        <Shadow>
          <View style={styles.searchBar}>
            <Image source={icons.search} style={styles.searchIcon} />

            <TextInput
              style={styles.textInput}
              value=""
              placeholder="Search Courses"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        </Shadow>
      </Animated.View>
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
        onScroll={onScroll}
        onScrollEndDrag={(event) => {
          if (
            event.nativeEvent.contentOffset.y > 10 &&
            event.nativeEvent.contentOffset.y < 50
          ) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 60,
              animated: true,
            });
          }
        }}
      >
        {/* Top Searches  */}
        {renderTopSearches()}

        {/* Brows Courses */}
        {renderBrowsCourses()}
      </Animated.ScrollView>

      {/* Search Bar */}
      {renderSearchBar()}
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
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - SIZES.padding * 2,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.gray40,
  },
  textInput: {
    flex: 1,
    marginLeft: SIZES.base,
    ...FONTS.h4,
  },
});

export default Search;
