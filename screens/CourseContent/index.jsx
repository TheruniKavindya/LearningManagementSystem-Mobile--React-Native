import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, constants, FONTS, icons, SIZES } from "../../constants";
import { SharedElement } from "react-native-shared-element";
import { RectButton } from "react-native-gesture-handler";
import Animated, { measure } from "react-native-reanimated";
import IconButton from "../../components/IconButton";
import { useFonts } from "expo-font";
import LineDivider from "../../components/LineDivider";
import CourseChapters from "./CourseTabs/CourseChapters";
import TextButton from "../../components/TextButton";
import Button from "../../components/Button";
import { Button as NativeButton } from "react-native";

const course_details_tabs = constants.course_details_tabs.map(
  (course_details_tab) => ({
    ...course_details_tab,
    ref: React.createRef(),
  })
);

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = course_details_tabs.map((_, i) => i * SIZES.width);

  const TabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        height: 4,
        width: TabIndicatorWidth,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [
          {
            translateX: translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onTabPress }) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef();
  const [removeLater, setRemoveLater] = React.useState(0);

  React.useEffect(() => {
    let ml = [];

    course_details_tabs.forEach((course_details_tab) => {
      course_details_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          setRemoveLater(x);
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === course_details_tabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      {/* Tab Indicator  */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/* Tabs  */}
      {course_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`Tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              onTabPress(index);
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                fontSize: SIZES.height > 800 ? 18 : 15,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CourseContent = ({ navigation, route }) => {
  const { category, sharedElementPrefix } = route.params;

  const FlatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onTabPress = React.useCallback((tabIndex) => {
    FlatListRef?.current?.scrollToOffSet({
      offset: tabIndex * SIZES.width,
    });
  });

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
          position: "relative",
        }}
      >
        {/* Enrollment Button */}
        <Button
          label="Enroll"
          contentContainerStyle={{
            // flex: 1,
            position: "absolute",
            zIndex: 50,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            // marginLeft: SIZES.base
            // marginRight:
            //   index == dummyData.top_searches.length - 1
            //     ? SIZES.padding
            //     : 0,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray10,
            width: SIZES.width,
            height: 200,
          }}
          labelStyle={{ color: COLORS.gray50, ...FONTS.h3 }}
        />

        <TouchableOpacity>
          <NativeButton
            title="Hello"
            style={{
              position: "absolute",
              zIndex: 50,
              paddingVertical: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              // marginLeft: SIZES.base
              // marginRight:
              //   index == dummyData.top_searches.length - 1
              //     ? SIZES.padding
              //     : 0,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.gray10,
              width: SIZES.width,
              height: 200,
              top: 0,
              left: 0,
            }}
          />
        </TouchableOpacity>

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
          }}
        >
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>

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
                {index == 0 && <CourseChapters />}
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
