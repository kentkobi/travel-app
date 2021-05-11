import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppIcon({ name, size = 40, iconColor = "black", backgroundColor }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}
    >
      <MaterialCommunityIcons name={name} size={size * 0.6} color={iconColor} />
    </View>
  );
}
const styles = StyleSheet.create({});

export default AppIcon;
