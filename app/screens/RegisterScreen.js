import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import AppColors from "../config/AppColors";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import DataManager from "../config/DataManager";

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const doErrorCheck = () => {
    setUsernameError(username.length > 0 ? "" : "Please enter a username");
    setEmailError(email.length > 0 ? "" : "Please enter an email");
    setPasswordError(password.length > 0 ? "" : "Please enter a validpassword");
    return username.length > 0 && email.length > 0 && password.length > 0
      ? true
      : false;
  };

  const handleSubmit = () => {
    let commonData = DataManager.getInstance();

    const newUser = {
      id: "id" + new Date().getTime(),
      name: username,
      email: email,
      password: password
    };
    console.log(newUser);
    commonData.addUser(newUser);
    commonData.setUserID(newUser.id);

    return newUser;
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.textInputContainer}>
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          placeholder="Full Name"
          textContentType="emailAddress"
          onChangeText={(userInputName) => setUsername(userInputName)}
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          placeholder="Email Address"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(userInputEmail) => setEmail(userInputEmail)}
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          onChangeText={(userInputPassword) => setPassword(userInputPassword)}
        />
      </View>
      <AppButton
        title="Register"
        onPress={() => {
          if (doErrorCheck()) {
            const user = handleSubmit();
            console.log(user);

            navigation.navigate("Home", {
              screen: "Home",
              params: {
                screen: "Home",
                params: {
                  paramEmail: user.email,
                  paramName: user.name
                }
              }
            });
          }
        }}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppColors.otherColor
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  textInputContainer: {
    marginVertical: 50
  }
});

export default RegisterScreen;
