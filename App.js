import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";

import FinalScreen from "./Screens/FinalScreen";
// import useAsyncLoadFonts from "./shared/hooks/useAsyncLoadFonts";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./shared/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./shared/fonts/Roboto-Regular.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <FinalScreen isAuth={isAuth} setIsAuth={setIsAuth} />
    </NavigationContainer>
  );
}
