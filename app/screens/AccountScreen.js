import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import AppColors from "../config/AppColors";
import AppListItem from "../components/AppListItem";
import AppScreen from "../components/AppScreen";
import DataManager from "../config/DataManager";

const getUser = () => {
  let commonData = DataManager.getInstance();
  console.log("getting user...", commonData.getUserID());

  let user = commonData.getUserID();
  return commonData.getUser(user);
};

function AccountScreen({ navigation, route }) {
  console.log("in accounting screen...");
  const [user, setUser] = useState(getUser());

  console.log("user is", getUser());
  console.log("user is", user);

  const handleLogOut = (id) => {
    let commonData = DataManager.getInstance();

    commonData.setUserID(null);
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.profileContainer}>
        {user && <AppListItem title={user.name} subtitle={user.email} />}
      </View>

      <AppButton
        title="Log out"
        onPress={() => {
          handleLogOut();
          navigation.navigate("Welcome");
        }}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.otherColor,
    marginTop: 0
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  profileContainer: {
    marginTop: 50,
    height: 90,
    backgroundColor: AppColors.otherColorLite,
    justifyContent: "center"
  },
  linksContainer: {
    marginVertical: 75,
    backgroundColor: AppColors.otherColorLite,
    height: 150,
    justifyContent: "space-around",
    paddingLeft: 10
  }
});
export default AccountScreen;
