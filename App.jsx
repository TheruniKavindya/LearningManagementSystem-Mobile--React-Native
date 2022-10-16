import React from "react";
import { Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { MainLayout, CourseContent } from "./screens";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createSharedElementStackNavigator();
const StackTwo = createStackNavigator();

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

        <StackTwo.Screen name="Login" component={Login} />
        {/* <StackTwo.Screen name="Signup" component={Signup} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
