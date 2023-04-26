import { KeyboardAvoidingView, StyleSheet, View, Platform } from "react-native";

const FormWrapper = ({ isKeyboardShow, pb, pt, children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={{
          ...styles.form,
          paddingBottom: isKeyboardShow ? 32 : pb,
          paddingTop: pt,
        }}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

export default FormWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
});
