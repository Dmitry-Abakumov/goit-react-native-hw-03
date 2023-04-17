import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";

import BgImgWrapper from "../../../shared/components/BgImgWrapper";
import FormWrapper from "../../../shared/components/FormWrapper";
import FormBtn from "../../../shared/components/FormBtn";
import TextField from "../../../shared/components/TextFIeld";

import useKeyboard from "../../../shared/hooks/useKeyboard";
import useForm from "../../../shared/hooks/useForm";
import formProps from "./formProps";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation, setIsAuth }) => {
  const { fields, setFields, onSubmit } = useForm(initialState, setIsAuth);
  const { isKeyboardShow } = useKeyboard();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <BgImgWrapper />
        <FormWrapper isKeyboardShow={isKeyboardShow} pb={144} pt={32}>
          <Text style={styles.formTitle}>Войти</Text>
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
          {!isKeyboardShow && <FormBtn onSubmit={onSubmit}>Войти</FormBtn>}

          {!isKeyboardShow && (
            <TouchableOpacity
              style={styles.loginRedirectLink}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.loginRedirectText}>
                Нет аккуаунта? зарегистрироваться
              </Text>
            </TouchableOpacity>
          )}
        </FormWrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
