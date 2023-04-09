import { useState } from "react";
import { Keyboard } from "react-native";

const useForm = (initialState) => {
  const [fields, setFields] = useState(initialState);

  const onSubmit = () => {
    setFields(initialState);
    Keyboard.dismiss();
  };

  return { fields, setFields, onSubmit };
};

export default useForm;
