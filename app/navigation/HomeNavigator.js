import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import TripScreen from "../screens/TripScreen";
import ItemScreen from "../screens/ItemScreen";
import NewItemScreen from "../screens/NewItemScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const AppStack = createStackNavigator();

const AuthNavigator = () => (
  <AppStack.Navigator mode="modal">
    <AppStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      name="TripScreen"
      component={TripScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
    <AppStack.Screen
      name="ItemScreen"
      component={ItemScreen}
      options={{ title: "" }}
    />
    <AppStack.Screen
      name="NewItemScreen"
      component={NewItemScreen}
      options={{ title: "New Item" }}
    />
  </AppStack.Navigator>
);

export default AuthNavigator;
