import { TouchableOpacity, StyleSheet } from "react-native";
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

const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();

const FinalScreen = ({ isAuth, setIsAuth }) => {
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
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={"Login"}>
        {(props) => <LoginScreen {...props} setIsAuth={setIsAuth} />}
      </AuthStack.Screen>
      <AuthStack.Screen name={"Registration"}>
        {(props) => <RegistrationScreen {...props} setIsAuth={setIsAuth} />}
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
});
