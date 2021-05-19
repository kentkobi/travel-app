import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import AppPicker from "../components/AppPicker";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import DataManager from "../config/DataManager";
import AppColors from "../config/AppColors";

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

const getThing = (id) => {
  let commonData = DataManager.getInstance();

  return commonData.getThing(id);
};

function ItemScreen({ navigation, route }) {
  const itineraryItem = getThing(route.params.id);

  const [title, setTitle] = useState(itineraryItem.title);
  const [subTitle, setSubTitle] = useState(itineraryItem.subtitle);
  const [category, setCategory] = useState(
    categories.find((el) => el.label === itineraryItem.category)
  );

  const [titleError, setTitleError] = useState("");
  const [subTitleError, setSubTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const doErrorCheck = () => {
    setTitleError(title.length > 0 ? "" : "Please set a valid title");
    setSubTitleError(
      subTitle.length > 0 ? "" : "Please set a valid description"
    );
    setCategoryError(category ? "" : "Please pick a category from the list");
    return title.length > 0 && subTitle.length > 0 && category ? true : false;
  };

  const update = (id) => {
    let commonData = DataManager.getInstance();

    const updated = {
      title: title,
      subtitle: subTitle,
      category: category.label
    };

    commonData.updateItem(id, updated);
  };

  const remove = (id) => {
    let commonData = DataManager.getInstance();

    commonData.removeItem(id);
  };

  return (
    <AppScreen style={{ backgroundColor: AppColors.otherColor }}>
      <AppTextInput
        icon="format-title"
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
        icon="subtitles-outline"
        placeholder="Description"
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
            update(route.params.id);
            navigation.navigate("TripScreen", { trip: route.params.trip });
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

export default ItemScreen;
