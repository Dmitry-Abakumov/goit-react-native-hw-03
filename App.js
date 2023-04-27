import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";

import FinalScreen from "./Screens/FinalScreen";
// import useAsyncLoadFonts from "./shared/hooks/useAsyncLoadFonts";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./shared/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./shared/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <FinalScreen isAuth={isAuth} setIsAuth={setIsAuth} />
    </NavigationContainer>
  );
}
