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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import BgImgWrapper from "../../../shared/components/BgImgWrapper";

import { userSignOut } from "../../../redux/auth/authOperations";

import { db } from "../../../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(null);

  const { userId, nickName } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  const getAllPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
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
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <BgImgWrapper />

      {posts && (
        <SafeAreaView style={styles.postsContainer}>
          <Text style={styles.userName}>{nickName}</Text>
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
          <TouchableOpacity
            style={styles.logoutIconWrap}
            onPress={() => {
              dispatch(userSignOut());
            }}
          >
            <MaterialIcons name='logout' size={24} color='#BDBDBD' />
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  postsContainer: {
    position: "relative",

    alignItems: "center",
    marginTop: 150,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  userName: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    marginBottom: 32,
  },
  logoutIconWrap: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});
