import React, { useState } from "react";
import { StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import AppColors from "../config/AppColors";
import AppPicker from "../components/AppPicker";
import AppScreen from "../components/AppScreen";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
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
  }
];

function NewItemScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");

  const [titleError, setTitleError] = useState("");
  const [subTitleError, setSubTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const doErrorCheck = () => {
    setTitleError(title.length > 0 ? "" : "Please set a valid Title");
    setSubTitleError(subTitle.length > 0 ? "" : "Please set a valid subtitle");
    setCategoryError(category ? "" : "Please pick a category from the list");
    return title.length > 0 && subTitle.length > 0 && category ? true : false;
  };

  const addItem = (trip) => {
    let commonData = DataManager.getInstance();

    const item = {
      id: "id" + new Date().getTime(),
      tripid: trip,

      title: title,
      subtitle: subTitle,
      category: category.label
    };

    commonData.addItem(item);

    navigation.navigate("TripScreen", { trip: route.params.trip });
  };

  return (
    <AppScreen style={{ backgroundColor: AppColors.otherColor }}>
      <AppTextInput
        icon="book-open-page-variant"
        placeholder="Title"
        value={title}
        onChangeText={(inputText) => setTitle(inputText)}
      />

      {titleError.length > 0 ? (
        <AppText style={{ margin: 5, color: "red", fontSize: 16 }}>
          {titleError}
        </AppText>
      ) : (
        <></>
      )}

      <AppTextInput
        icon="calendar-month"
        placeholder="Date"
        value={subTitle}
        onChangeText={(inputText) => setSubTitle(inputText)}
      />

      {subTitleError.length > 0 ? (
        <AppText style={{ margin: 5, color: "red", fontSize: 16 }}>
          {subTitleError}
        </AppText>
      ) : (
        <></>
      )}

      <AppPicker
        selectedItem={category}
        onSelectItem={(item) => setCategory(item)}
        data={categories}
        icon="apps"
        placeholder="Categories"
        numColumns={3}
      />

      {categoryError.length > 0 ? (
        <AppText style={{ margin: 5, color: "red", fontSize: 16 }}>
          {categoryError}
        </AppText>
      ) : (
        <></>
      )}

      <AppButton
        title="Save"
        onPress={() => {
          if (doErrorCheck()) {
            addItem(route.params.trip);
          }
        }}
      />
    </AppScreen>
  );
}
const styles = StyleSheet.create({
  imageButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30
  }
});

export default NewItemScreen;
