import React, { useEffect } from "react";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import ChangePassword from "./screens/ChangePassword";
import Verify from "./screens/Verify";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import UpdateProfile from "./screens/updateProfile";
import CameraComponent from "./screens/CameraComponents";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/Action";
import Add from "./screens/Add";
const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  const [initializing, setInitializing] = React.useState(true);
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  // console.log("loading from main jsx: ", loading);
  if (initializing) setInitializing(false);
  if (initializing) return null;

  // console.log("loading from main jsx: ", loading);
  const AuthScreens = () => {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{ title: "Verify" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: "Forgot Password" }}
        />
        <Stack.Screen name="Camera" component={CameraComponent} />
      </Stack.Navigator>
    );
  };

  const BottomTab = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        shifting={true}
        inactiveColor="#3e2465"
        barStyle={{
          backgroundColor: "#694fad",
          height: 70,
          overflow: "hidden",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor: "#694fad",
          elevation: 10,
          shadowOffset: {
            width: 5,
            height: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color={"blue"} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarLabel: "Add",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={"blue"}
                size={24}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account" color={"blue"} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const AppScreens = () => {
    return (
      <Stack.Navigator
        initialRouteName="bottom-tab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="bottom-tab" component={BottomTab} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="updateProfile" component={UpdateProfile} />
        <Stack.Screen name="Camera" component={CameraComponent} />
      </Stack.Navigator>
    );
  };
  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <AppScreens />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthScreens />
    </NavigationContainer>
  );
};

export default Main;

// 3 : 43 : 13
