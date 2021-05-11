import React, { useState } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";

import AppColors from "../config/AppColors";
import AppIcon from "../components/AppIcon";
import AppListItem from "../components/AppListItem";
import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import DataManager from "../config/DataManager";

const getTrips = () => {
  let commonData = DataManager.getInstance();
  let user = commonData.getUserID();
  console.log("user is ", user);
  return user ? commonData.getTrips(user) : null;
};

function HomeScreen({ navigation, route }) {
  const tripList = getTrips();
  const [refreshing, setRefreshing] = useState(false);
  const [trips, setTrips] = useState(tripList);

  const handleDelete = (id) => {
    let commonData = DataManager.getInstance();

    commonData.removeTrip(id);
    setTrips(getTrips());
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.linksContainer}>
        <FlatList
          data={tripList}
          keyExtractor={(trip) => trip.id.toString()}
          renderItem={({ item }) => (
            <AppListItem
              title={item.title}
              IconComponent={
                <AppIcon
                  name="wallet-travel"
                  size={50}
                  iconColor={AppColors.otherColor}
                  backgroundColor={AppColors.primaryColor}
                />
              }
              onPress={() =>
                navigation.navigate("TripScreen", {
                  name: item.title,
                  trip: item.id
                })
              }
              onSwipeLeft={() => (
                <View style={styles.deleteView}>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <AppText>delete</AppText>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />
      </View>
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
    backgroundColor: AppColors.otherColorLite,
    justifyContent: "space-around"
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: AppColors.primaryColor
  },
  deleteView: {
    backgroundColor: AppColors.danger,
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10
  }
});
export default HomeScreen;
