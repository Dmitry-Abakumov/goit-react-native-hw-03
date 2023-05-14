import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../../firebase/config";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState(null);

  const getAllPosts = async () => {
    try {
      const q = query(collection(db, "posts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userPosts = [];

        querySnapshot.forEach((doc) => {
          const post = {
            ...doc.data(),
            id: doc.id,
          };

          userPosts.push(post);
        });

        setPosts(userPosts);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    posts && (
      <SafeAreaView style={styles.postContainer}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <>
              <View style={styles.imgContainer}>
                <Image style={styles.img} source={{ uri: item.photo }} />
              </View>
              <View style={styles.postNameWrap}>
                <Text style={styles.postNameText}>
                  {item.postData.postName}
                </Text>
              </View>
              <View style={styles.btnsWrap}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.postId,
                      uri: item.photo,
                    })
                  }
                  activeOpacity={0.5}
                  style={styles.btn}
                >
                  <FontAwesome
                    style={styles.icon}
                    name='comment-o'
                    size={18}
                    color='#BDBDBD'
                  />
                  {/* <Text style={styles.commentIconText}>0</Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Map", {
                      coords: item.coords,
                      location: item.postData.location,
                    })
                  }
                  activeOpacity={0.5}
                  style={styles.btn}
                >
                  <SimpleLineIcons
                    style={styles.icon}
                    name='location-pin'
                    size={18}
                    color='#BDBDBD'
                  />
                  <Text style={styles.locationText}>
                    {item.postData.location}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          keyExtractor={({ id }) => id}
        />
      </SafeAreaView>
    )
  );
};

export default DefaultScreenPosts;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
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
  btnsWrap: {
    width: 343,
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  btn: {
    flexDirection: "row",
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
  commentIconText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
});
