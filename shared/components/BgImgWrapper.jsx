import { StyleSheet, ImageBackground, Dimensions, View } from "react-native";

export const BgImgWrapper = () => {
  return (
    <ImageBackground
      source={require("../images/bg-img.jpg")}
      style={styles.img}
    />
  );
};

export default BgImgWrapper;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
