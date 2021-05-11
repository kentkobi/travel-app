import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AppTab = createBottomTabNavigator();

import AccountScreen from "../screens/AccountScreen";
import AppColors from "../config/AppColors";
import AppIcon from "../components/AppIcon";
import HomeNavigator from "./HomeNavigator";
import NewTripScreen from "../screens/NewTripScreen";

const TabNavigator = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: AppColors.otherColor,
      activeBackgroundColor: AppColors.primaryColor,
    }}
  >
    <AppTab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: () => (
          <AppIcon
            size={30}
            name="home"
            backgroundColor={AppColors.otherColor}
          />
        ),
      }}
    />
    <AppTab.Screen
      name="NewTrip"
      component={NewTripScreen}
      options={{
        title: "New Trip",
        tabBarIcon: () => (
          <AppIcon
            size={30}
            name="wallet-travel"
            backgroundColor={AppColors.otherColor}
          />
        ),
      }}
    />
    <AppTab.Screen
      name="Me"
      component={AccountScreen}
      options={{
        tabBarIcon: () => (
          <AppIcon
            size={30}
            name="account"
            backgroundColor={AppColors.otherColor}
          />
        ),
      }}
    />
  </AppTab.Navigator>
);

export default TabNavigator;
