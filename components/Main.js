import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FinalScreen from "../Screens/FinalScreen";

import { isAuthChange } from "../redux/auth/authOperations";

const Main = () => {
  // const [isAuth, setIsAuth] = useState(false);
  const { isAuth } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthChange());
  }, []);

  return (
    <NavigationContainer>
      <FinalScreen isAuth={isAuth} />
    </NavigationContainer>
  );
};

export default Main;
