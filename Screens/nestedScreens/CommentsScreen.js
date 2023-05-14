import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  keyboardVerticalOffset,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { doc, query, setDoc, collection, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import useForm from "../../shared/hooks/useForm";
import useKeyboard from "../../shared/hooks/useKeyboard";

import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const [userComments, setUserComments] = useState(null);
  const { fields: field, setFields: setField, onSubmit } = useForm("");
  const { isKeyboardShow } = useKeyboard();

  const nickName = useSelector(({ auth: { nickName } }) => nickName);

  const { postId, uri } = route.params;

  const getComments = async () => {
    try {
      const q = query(collection(db, `posts/${postId}/comments`));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userComments = [];

        querySnapshot.forEach((doc) => {
          const comment = {
            ...doc.data(),
            id: doc.id,
          };

          userComments.push(comment);
        });

        setUserComments(userComments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const uploadCommentsToServer = async () => {
    if (field.trim() === "") return;
    console.log("Отправка комментария");
    try {
      console.log(postId);
      const commentsRef = doc(collection(db, `posts/${postId}/comments`));

      // later...
      await setDoc(commentsRef, { comment: field, nickName });
      // await setDoc(doc(db, "posts", postId, "comments"), field);

      onSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri }} />
          </View>
          <View onStartShouldSetResponder={() => true}>
            {userComments && !isKeyboardShow && (
              <SafeAreaView
                style={{ maxHeight: Dimensions.get("window").height - 480 }}
              >
                <FlatList
                  data={userComments}
                  renderItem={({ item }) => (
                    <View style={styles.commentWrap}>
                      <Text style={styles.nickName}>{item.nickName}</Text>
                      <Text>{item.comment}</Text>
                    </View>
                  )}
                  keyExtractor={({ id }) => id}
                />
              </SafeAreaView>
            )}
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              name={"comment"}
              value={field}
              placeholder={"Комментировать..."}
              onChangeText={(text) => setField(text)}
            />
            <TouchableOpacity
              style={styles.sendCommentBtn}
              activeOpacity={0.7}
              onPress={uploadCommentsToServer}
            >
              <AntDesign name='arrowup' size={14} color='white' />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },
  sendCommentBtn: {
    position: "absolute",
    top: 8,
    right: 8,

    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
  },
  input: {
    // position: "absolute",
    // left: 16,
    // bottom: 16,

    borderRadius: 100,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
  },
  inputWrap: {
    // position: "absolute",
    // left: 16,
    // bottom: 16,
    marginTop: 31,
    marginBottom: 16,
  },
  nickName: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  commentWrap: {
    positiom: "relative",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: "100%",
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  imgContainer: {
    borderRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
    marginTop: 32,
  },
  img: {
    height: 240,
  },
});
