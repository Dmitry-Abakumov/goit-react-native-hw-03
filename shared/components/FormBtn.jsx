import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FormBtn = ({ onSubmit, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.formBtn}
      onPress={onSubmit}
    >
      <Text style={styles.formBtnText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default FormBtn;

const styles = StyleSheet.create({
  formBtn: {
    alignItems: "center",
    marginTop: 43,
    paddingTop: 16,
    paddingBottom: 16,
    width: "100%",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  formBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
