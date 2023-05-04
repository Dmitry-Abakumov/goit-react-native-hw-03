import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const DefaultScreenPosts = ({ params, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!params) return;

    setPosts((prevState) => [...prevState, params]);
  }, [params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <>
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={{ uri: item.photo }} />
            </View>
            <View style={styles.postNameWrap}>
              <Text style={styles.postNameText}>{item.postData.postName}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Map", {
                  coords: item.coords,
                  location: item.postData.location,
                })
              }
              activeOpacity={0.5}
              style={styles.locationBtn}
            >
              <SimpleLineIcons
                style={styles.icon}
                name='location-pin'
                size={18}
                color='#BDBDBD'
              />
              <Text style={styles.locationText}>{item.postData.location}</Text>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(_, index) => index}
      />
    </View>
  );
};

export default DefaultScreenPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 32,
  },
  img: {
    width: 343,
    height: 240,
  },
  locationBtn: {
    width: 343,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 8,
  },
  icon: {
    marginRight: 8,
  },
  postNameWrap: {
    marginTop: 8,
  },
  locationText: {
    textDecorationLine: "underline",
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  postNameText: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
});
