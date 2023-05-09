import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";

import BgImgWrapper from "../../../shared/components/BgImgWrapper";
import FormBtn from "../../../shared/components/FormBtn";
import TextField from "../../../shared/components/TextFIeld";

import useForm from "../../../shared/hooks/useForm";
import formProps from "./formProps";

import { signUp } from "../../../redux/auth/authOperations";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ isKeyboardShow, navigation }) => {
  const { fields, setFields, onSubmit } = useForm(initialState);
  const dispatch = useDispatch();

  const onRegisterFormSubmit = () => {
    const { email, password } = fields;

    dispatch(signUp(fields));
    onSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <BgImgWrapper />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View
            style={{
              ...styles.formWrapper,
              paddingBottom: isKeyboardShow ? 32 : 78,
            }}
          >
            <Text style={styles.formTitle}>Регистрация</Text>
            <TextField
              onChangeText={(text) =>
                setFields((prevFields) => ({ ...prevFields, name: text }))
              }
              value={fields.name}
              {...formProps.name}
            />
            <TextField
              onChangeText={(text) =>
                setFields((prevFields) => ({ ...prevFields, email: text }))
              }
              value={fields.email}
              {...formProps.email}
            />
            <View style={styles.passwordWrapper}>
              <TextField
                onChangeText={(text) =>
                  setFields((prevFields) => ({
                    ...prevFields,
                    password: text,
                  }))
                }
                value={fields.password}
                {...formProps.password}
              />
              {/* <TouchableOpacity style={styles.passwordBtn}>
          <Text style={styles.passwordBtnText}>Показать</Text>
        </TouchableOpacity> */}
            </View>
            {!isKeyboardShow && (
              <FormBtn onSubmit={onRegisterFormSubmit}>
                Зарегестрироваться
              </FormBtn>
            )}

            {!isKeyboardShow && (
              <TouchableOpacity
                style={styles.loginRedirectLink}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginRedirectText}>
                  Уже есть аккаунт? Войти
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  formWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
  },
  formTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#212121",
    marginBottom: 16,
    fontFamily: "Roboto-Medium",
  },

  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  passwordBtn: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  passwordBtnText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },

  loginRedirectLink: {
    marginTop: 16,
  },
  loginRedirectText: {
    color: "#1B4371",
  },
});
