import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboard = () => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardShow(true)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardShow(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { isKeyboardShow };
};

export default useKeyboard;
