import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen/ProfileScreen";

import useAsyncLoadFonts from "./shared/hooks/useAsyncLoadFonts";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const authStack = createStackNavigator();

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const { fontsLoaded, onLayoutRootView } = useAsyncLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  const getScreens = () => {
    if (isAuth) {
      return (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { ...styles.tabBarStyle },
          }}
        >
          <Tab.Screen
            name='Posts'
            component={PostsScreen}
            options={{
              tabBarIcon: (focused, color, size) => (
                <SimpleLineIcons name='grid' size={24} color='black' />
              ),
              tabBarShowLabel: false,
              headerTitle: () => (
                <TouchableOpacity onPress={() => setIsAuth(false)}>
                  <MaterialIcons name='logout' size={24} color='black' />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name='CreatePosts'
            component={CreatePostsScreen}
            options={{
              tabBarIcon: (focused, color, size) => (
                <Feather name='plus' size={13} color='white' />
              ),
              tabBarShowLabel: false,
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  activeOpacity={0.7}
                  style={styles.iconWrapper}
                />
              ),
            }}
          />
          <Tab.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
              tabBarIcon: (focused, color, size) => (
                <Feather name='user' size={24} color='black' />
              ),
              tabBarShowLabel: false,
            }}
          />
        </Tab.Navigator>
      );
    }

    return (
      <authStack.Navigator screenOptions={{ headerShown: false }}>
        <authStack.Screen name={"Login"}>
          {(props) => <LoginScreen {...props} setIsAuth={setIsAuth} />}
        </authStack.Screen>
        <authStack.Screen name={"Registration"}>
          {(props) => <RegistrationScreen {...props} setIsAuth={setIsAuth} />}
        </authStack.Screen>
      </authStack.Navigator>
    );
  };

  const screens = getScreens(false);

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {screens}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 70,
    hight: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
  tabBarStyle: {
    paddingTop: 9,
    paddingBittom: 34,
  },
});
