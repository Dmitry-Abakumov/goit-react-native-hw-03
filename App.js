import {
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState } from "react";

import RegistrationScreen from "./Screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen/PostsScreen";

import useAsyncLoadFonts from "./shared/hooks/useAsyncLoadFonts";

SplashScreen.preventAutoHideAsync();

const authStack = createStackNavigator();
const mainStack = createStackNavigator();

const App = () => {
  const { fontsLoaded, onLayoutRootView } = useAsyncLoadFonts();

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  if (!fontsLoaded) {
    return null;
  }

  const getScreens = (isAuth) => {
    if (isAuth) {
      return (
        <mainStack.Navigator>
          <mainStack.Screen name='Posts' component={PostsScreen} />
        </mainStack.Navigator>
      );
    }

    return (
      <authStack.Navigator screenOptions={{ headerShown: false }}>
        <authStack.Screen name={"Login"} component={LoginScreen} />
        <authStack.Screen
          name={"Registration"}
          component={RegistrationScreen}
        />
      </authStack.Navigator>
    );
  };

  const screens = getScreens(false);

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback
        onPress={keyboardHide}
        onLayout={onLayoutRootView}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {screens}
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
};

export default App;
