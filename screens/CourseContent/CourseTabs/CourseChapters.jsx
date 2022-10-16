import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../../constants";
import IconLabel from "../../../components/IconLabel";
import LineDivider from "../../../components/LineDivider";

const CourseChapters = () => {
  function renderHeader() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Title  */}
        <Text
          style={{
            ...FONTS.h2,
          }}
        >
          {dummyData?.course_details?.title}
        </Text>

        {/* Duration   */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.gray30,
              ...FONTS.body4,
            }}
          >
            {dummyData?.course_details?.number_of_students}
          </Text>

          <IconLabel
            icon={icons.time}
            label={dummyData.course_details.duration}
            containerStyle={{
              marginLeft: SIZES.radius,
            }}
            iconStyle={{
              width: 15,
              height: 15,
            }}
            labelStyle={{
              ...FONTS.body4,
            }}
          />
        </View>
      </View>
    );
  }

  function renderDescription() {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Description */}
        <Text>{dummyData?.course_details?.description}</Text>
      </View>
    );
  }

  function renderChapter() {
    return (
      <View>
        {dummyData?.course_details?.videos.map((item, index) => {
          return (
            <View
              key={`Videos-${index}`}
              style={{
                alignItems: "center",
                height: 70,
                backgroundColor: item?.is_playing
                  ? COLORS.additionalColor11
                  : null,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: SIZES.padding,
                  alignItems: "center",
                  height: 70,
                }}
              >
                {/* Icon  */}
                <Image
                  source={
                    item?.is_complete
                      ? icons.completed
                      : item?.is_playing
                      ? icons.play_1
                      : icons.lock
                  }
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />

                {/* Title and Duration  */}
                <View
                  style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                    }}
                  >
                    {item?.title}
                  </Text>

                  <Text
                    style={{
                      color: COLORS.gray30,
                      ...FONTS.body4,
                    }}
                  >
                    {item.duration}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <ScrollView>
      {/* Header  */}
      {renderHeader()}

      {/* Description  */}
      {renderDescription()}

      {/* Line divider  */}

      {/* chapters  */}
      {renderChapter()}
    </ScrollView>
  );
};

export default CourseChapters;
