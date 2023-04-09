import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import BgImgWrapper from "../../../shared/components/BgImgWrapper";
import FormWrapper from "../../../shared/components/FormWrapper";
import FormBtn from "../../../shared/components/FormBtn";
import TextField from "../../../shared/components/TextFIeld";

import useKeyboard from "../../../shared/hooks/useKeyboard";
import useForm from "../../../shared/hooks/useForm";
import formProps from "./formProps";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const { fields, setFields, onSubmit } = useForm(initialState, navigation);

  const { isKeyboardShow } = useKeyboard();
  return (
    <>
      <BgImgWrapper />
      <FormWrapper isKeyboardShow={isKeyboardShow} pb={78} pt={92}>
        <Text style={styles.formTitle}>Регистрация</Text>
        <TextField
          onChangeText={(text) =>
            setFields((prevFields) => ({ ...prevFields, login: text }))
          }
          value={fields.login}
          {...formProps.login}
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
              setFields((prevFields) => ({ ...prevFields, password: text }))
            }
            value={fields.password}
            {...formProps.password}
          />
          {/* <TouchableOpacity style={styles.passwordBtn}>
          <Text style={styles.passwordBtnText}>Показать</Text>
        </TouchableOpacity> */}
        </View>
        {!isKeyboardShow && (
          <FormBtn onSubmit={onSubmit}>Зарегестрироваться</FormBtn>
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
      </FormWrapper>
    </>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
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
