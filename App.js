import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import { store } from "./redux/store";

// import FinalScreen from "./Screens/FinalScreen";
import Main from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./shared/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./shared/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
