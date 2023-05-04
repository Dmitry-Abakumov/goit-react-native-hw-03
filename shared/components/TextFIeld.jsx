import { TextInput, StyleSheet } from "react-native";

const TextField = ({ value, onChangeText, ...props }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      {...props}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginTop: 16,
    paddingLeft: 16,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
