import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  useAnimatedValue,
} from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import RegistrationScreen from "../Screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen/LoginScreen";
import PostsScreen from "../Screens/mainScreen/PostsScreen/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreen/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreen/ProfileScreen/ProfileScreen";

import useKeyboard from "../shared/hooks/useKeyboard";

import { userSignOut } from "../redux/auth/authOperations";

const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();

const FinalScreen = ({ isAuth }) => {
  const { isKeyboardShow } = useKeyboard();
  const dispatch = useDispatch();

  if (isAuth) {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            ...styles.tabBarStyle,
            display: isKeyboardShow ? "none" : "flex",
          },
        }}
        initialRouteName='CreatePosts'
      >
        <Tab.Screen
          name='Posts'
          component={PostsScreen}
          options={{
            tabBarIcon: (focused, color, size) => (
              <SimpleLineIcons name='grid' size={24} color='black' />
            ),
            // headerTitleAlign: "right",
            tabBarShowLabel: false,
            headerTitle: "",
            headerRight: () => (
              <TouchableOpacity
                style={styles.logoutIconWrap}
                onPress={() => {
                  dispatch(userSignOut());
                }}
              >
                <MaterialIcons name='logout' size={24} color='#BDBDBD' />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name='CreatePosts'
          component={CreatePostsScreen}
          options={{
            title: "Создать публикацию",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#212121",
              fontFamily: "Roboto-Regular",
              fontSize: 17,
            },
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
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={"Login"}>
        {(props) => <LoginScreen {...props} isKeyboardShow={isKeyboardShow} />}
      </AuthStack.Screen>
      <AuthStack.Screen name={"Registration"}>
        {(props) => (
          <RegistrationScreen {...props} isKeyboardShow={isKeyboardShow} />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default FinalScreen;

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
  createPostHeader: {
    alignItems: "center",
    justifyContent: "center",
  },
  createPostTitle: {
    textAlign: "center",
  },
  logoutIconWrap: {
    marginRight: 16,
  },
});
