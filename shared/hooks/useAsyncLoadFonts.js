import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const useAsyncLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
};

export default useAsyncLoadFonts;
