import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppColors from "../config/AppColors";
import AppIcon from "../components/AppIcon";
import AppListItem from "../components/AppListItem";
import AppPicker from "../components/AppPicker";
import AppScreen from "../components/AppScreen";
import DataManager from "../config/DataManager";

const categories = [
  { label: "Stay", value: 1, icon: "bed", backgroundColor: "red" },
  { label: "Eat", value: 2, icon: "store", backgroundColor: "blue" },
  { label: "Play", value: 3, icon: "party-popper", backgroundColor: "green" },
  {
    label: "Nightlife",
    value: 3,
    icon: "party-popper",
    backgroundColor: "purple"
  },
  {
    label: "Culture",
    value: 4,
    icon: "meditation",
    backgroundColor: "lightblue"
  },
  {
    label: "Shopping",
    value: 5,
    icon: "shopping",
    backgroundColor: "orange"
  },
  {
    label: "Everything!",
    value: 99,
    icon: "party-popper",
    backgroundColor: "black"
  }
];

const getItinerary = (trip, category) => {
  console.log("getting itinerary for " + trip + " ...");
  console.log("and category is " + category + " ...");
  let commonData = DataManager.getInstance();
  let itinerary = null;

  if (!category || category === "Everything!") {
    itinerary = commonData.getItinerary(trip, category);
  } else {
    itinerary = commonData.getItineraryByCategory(trip, category);
  }

  return itinerary;
};

function TripScreen({ navigation, route }) {
  console.log("in TripScreen function");

  const [category, setCategory] = useState("Everything!");
  console.log("category is ", category);

  let intineraryList = getItinerary(route.params.trip, category);

  const [listTitle, setListTitle] = useState("");
  const [items, setItems] = useState(intineraryList);
  const [refresh, setRefresh] = useState(false);

  console.log("items are ", intineraryList);

  const handleDelete = (id) => {
    let commonData = DataManager.getInstance();
    commonData.removeItem(id);
    setItems(getItinerary(route.params.trip));
  };

  const handleFilter = (category) => {
    const filteredList =
      category.label == "Everything!"
        ? intineraryList
        : intineraryList.filter((el) => el.category === category.label);

    setCategory(category.label);
    setListTitle(category.label);
    setItems(filteredList);
  };

  /*useEffect(() => {
    console.log("initial list", intineraryList);
  }, []);
  useEffect(() => {
    console.log("intineraryList changed!", intineraryList);
  }, [intineraryList]);*/

  return (
    <AppScreen style={styles.container}>
      <AppPicker
        onSelectItem={(item) => handleFilter(item)}
        data={categories}
        icon="apps"
        placeholder={listTitle || "Filter list"}
        numColumns={3}
      />

      <FlatList
        data={intineraryList}
        extraData={intineraryList}
        keyExtractor={(intinerary) => intinerary.id.toString()}
        renderItem={({ item }) => (
          <AppListItem
            title={item.title}
            IconComponent={
              <AppIcon
                name={categories.find((el) => el.label === item.category).icon}
                size={50}
                iconColor={AppColors.white}
                backgroundColor={
                  categories.find((el) => el.label === item.category)
                    .backgroundColor
                }
              />
            }
            subtitle={item.subtitle}
            onPress={() =>
              navigation.navigate("ItemScreen", {
                trip: route.params.trip,
                id: item.id
              })
            }
            onSwipeLeft={() => (
              <View style={styles.deleteView}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <AppIcon
                    name="trash-can"
                    iconColor={AppColors.otherColor}
                    backgroundColor={AppColors.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyView}>
            <AppText style={styles.title}>
              Looks like we don't have anything yet!
            </AppText>
          </View>
        )}
      />
      <View style={styles.buttonView}>
        <AppButton
          title="Add to list"
          onPress={() =>
            navigation.navigate("NewItemScreen", { trip: route.params.trip })
          }
          style={styles.listButton}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.otherColor,
    flex: 1,
    marginTop: 0
  },
  emptyView: {
    padding: 15,
    textAlign: "center"
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5
  },
  buttonView: {
    padding: 45
  }
});

export default TripScreen;
