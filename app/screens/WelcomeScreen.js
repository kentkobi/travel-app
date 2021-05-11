import React from "react";
import { View, StyleSheet, ImageBackground, Platform } from "react-native";

import AppColors from "../config/AppColors";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";

const blurRadiusValue = Platform.OS === "android" ? 0.7 : 5.5;

function WelcomeScreen({ navigation }) {
  return (
    <AppScreen>
      <ImageBackground
        source={require("../assets/background.jpeg")}
        style={styles.background}
        blurRadius={blurRadiusValue}
      >
        <View style={styles.welcomeContainer}>
          <AppText style={styles.welcomeHeader}>Travel Wishes</AppText>
        </View>

        <View style={styles.buttonsContainer}>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
          <AppButton
            title="Register"
            color="secondaryColor"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </ImageBackground>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  welcomeHeader: {
    fontSize: 60,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: AppColors.white,

    textShadowColor: "#000",
    textShadowOffset: { width: 0.8, height: 0.8 },
    textShadowRadius: 3,
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  buttonsContainer: {
    marginTop: 150,
    marginEnd: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 150,
    alignSelf: "flex-end",
    width: "50%",
  },
});
export default WelcomeScreen;
