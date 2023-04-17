import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboard = () => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  useEffect(() => {
    const didShowSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShow(true);
    });
    const didHideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardShow(false)
    );

    return () => {
      didShowSubscription.remove();
      didHideSubscription.remove();
    };
  }, []);

  return { isKeyboardShow };
};

export default useKeyboard;
