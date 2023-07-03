import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { SimpleLineIcons } from "@expo/vector-icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

import TextField from "../../../shared/components/TextFIeld";
import FormBtn from "../../../shared/components/FormBtn";

import useForm from "../../../shared/hooks/useForm";
import formProps from "./formProps";

import { db } from "../../../firebase/config";

const initialState = {
  postName: "",
  location: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { fields, setFields, onSubmit } = useForm(initialState);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const userId = useSelector(({ auth: { userId } }) => userId);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const publicPhoto = async () => {
    if (!photo) return;

    const { status } = await Location.requestForegroundPermissionsAsync();

    let coords = null;

    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }

    const response = await fetch(photo);
    const file = await response.blob();
    const id = Date.now().toString();

    const storage = getStorage();
    const storageRef = ref(storage, `images/${id}`);

    await uploadBytes(storageRef, file);

    const photoLink = await getDownloadURL(storageRef);

    const docData = {
      photo: photoLink,
      coords,
      postData: fields,
      postId: id,
      userId,
    };

    await setDoc(doc(db, "posts", id), docData);

    await navigation.navigate("Posts");

    setPhoto(null);
    onSubmit();
  };

  navigation.addListener("focus", () => {
    setLoaded(true);
  });
  navigation.addListener("blur", () => {
    setLoaded(false);
  });

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.cameraPermissionWrap}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          style={styles.grandPermissionBtn}
          activeOpacity={0.7}
          onPress={requestPermission}
        >
          <Text style={{ color: "#fff" }}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    loaded && (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.cameraWrapper}>
              <Camera
                ratio={"3:4"}
                style={styles.camera}
                ref={(ref) => {
                  setCameraRef(ref);
                }}
              >
                {photo && (
                  <View style={styles.photoContainer}>
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 8 }}
                      source={{ uri: photo }}
                    ></Image>
                  </View>
                )}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.cameraBtn}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      setPhoto(uri);
                      await MediaLibrary.createAssetAsync(uri);
                    }
                  }}
                >
                  <FontAwesome5 name='camera' size={20} color='#fff' />
                </TouchableOpacity>
              </Camera>
            </View>
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.placeholderText}>Редактировать фото</Text>
            </View>
            <TextInput
              onChangeText={(text) =>
                setFields((prevState) => ({ ...prevState, postName: text }))
              }
              value={fields.postName}
              style={styles.input}
              {...formProps.postName}
            />
            <View style={styles.inputWrapper}>
              <TextInput
                onChangeText={(text) =>
                  setFields((prevState) => ({ ...prevState, location: text }))
                }
                value={fields.location}
                style={{ ...styles.input, paddingLeft: 28 }}
                {...formProps.location}
              />
              <SimpleLineIcons
                style={styles.icon}
                name='location-pin'
                size={18}
                color='#BDBDBD'
              />
            </View>

            <FormBtn onSubmit={publicPhoto}>Опубликовать</FormBtn>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  cameraPermissionWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  cameraWrapper: {
    marginTop: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    with: 343,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  grandPermissionBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 9,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  cameraPlaceholder: {
    marginTop: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
  photoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 8,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#BDBDBD",
  },
  inputWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 16,
    left: 4,
  },
});
