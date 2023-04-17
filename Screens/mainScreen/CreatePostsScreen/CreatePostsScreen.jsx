import { Text, StyleSheet, View } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CreatePostsScreen</Text>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
