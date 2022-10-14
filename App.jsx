import React from "react";
import { Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainLayout, CourseContent } from "./screens";

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          useNativeDriver: true,
          headerShown: false,
        }}
        initialRouteName={"Dashboard"}
        detachInactiveScreens={false}
      >
        <Stack.Screen name="Dashboard" component={MainLayout} />

        <Stack.Screen
          name="CourseContent"
          component={CourseContent}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
