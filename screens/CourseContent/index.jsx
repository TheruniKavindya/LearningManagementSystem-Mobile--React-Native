import { BackHandler, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, constants, FONTS, icons, SIZES } from "../../constants";
import { SharedElement } from "react-native-shared-element";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import IconButton from "../../components/IconButton";
import { useFonts } from "expo-font";
import LineDivider from "../../components/LineDivider";

const CourseContent = ({ navigation, route }) => {
  const { category, sharedElementPrefix } = route.params;

  const FlatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  //Handler
  function backHandler() {
    navigation.goBack();
  }

  function renderHeader() {
    const [loaded] = useFonts({
      "Roboto-Black": require("../../assets/fonts/Roboto-Black.ttf"),
    });

    if (!loaded) {
      return null;
    }

    return (
      <Animated.View
        style={{
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
        <Animated.View>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{
              position: "absolute",
              top: 40,
              left: 20,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              BackHandler();
            }}
          />
        </Animated.View>
      </Animated.View>
    );
  }

  function renderContent() {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: "blue",
        }}
      >
        {/* Tabs */}
        <View
          style={{
            height: 60,
            backgroundColor: "red",
          }}
        ></View>

        {/* Line Divider */}
        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.gray20,
          }}
        />

        {/* Content */}
        <Animated.FlatList
          ref={FlatListRef}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          data={constants.course_details_tabs}
          keyExtractor={(item) => `CourseDetailTabs-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffSet: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                }}
              >
                {index == 0 && <Text>Chapters</Text>}
                {index == 1 && <Text>Notifications</Text>}
                {index == 2 && <Text>Participants</Text>}
              </View>
            );
          }}
        />
      </View>
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

      {/* content */}
      {renderContent()}
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
