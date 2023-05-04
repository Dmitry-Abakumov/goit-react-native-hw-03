import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../../nestedScreens/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ route }) => {
  const { params } = route;
  return (
    <NestedScreen.Navigator screenOptions={{ headerShown: false }}>
      <NestedScreen.Screen name={"DefaultScreen"}>
        {(props) => <DefaultScreenPosts params={params} {...props} />}
      </NestedScreen.Screen>
      <NestedScreen.Screen name={"Comments"}>
        {(props) => <CommentsScreen {...props} />}
      </NestedScreen.Screen>
      <NestedScreen.Screen name={"Map"}>
        {(props) => <MapScreen {...props} />}
      </NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
