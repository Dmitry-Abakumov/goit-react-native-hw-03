import { useState } from "react";
import { Keyboard } from "react-native";

const useForm = (initialState, setIsAuth) => {
  const [fields, setFields] = useState(initialState);

  const onSubmit = () => {
    setIsAuth(true);
    setFields(initialState);
    Keyboard.dismiss();
  };

  return { fields, setFields, onSubmit };
};

export default useForm;
