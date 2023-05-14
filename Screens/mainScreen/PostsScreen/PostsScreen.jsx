import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import DefaultScreenPosts from "../../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../../nestedScreens/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen";

import { userSignOut } from "../../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  return (
    <NestedScreen.Navigator
      screenOptions={{
        // tabBarIcon: (focused, color, size) => (
        //   <SimpleLineIcons name='grid' size={24} color='black' />
        // ),
        // tabBarShowLabel: false,
        // headerTitle: "",
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
    >
      <NestedScreen.Screen
        name={"DefaultScreen"}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Regular",
            fontSize: 17,
          },
        }}
      >
        {(props) => <DefaultScreenPosts {...props} />}
      </NestedScreen.Screen>
      <NestedScreen.Screen
        name={"Comments"}
        options={{
          title: "Комментарии",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Regular",
            fontSize: 17,
          },
          headerLeft: () => null,
        }}
      >
        {(props) => <CommentsScreen {...props} />}
      </NestedScreen.Screen>
      <NestedScreen.Screen name={"Map"}>
        {(props) => <MapScreen {...props} />}
      </NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

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
