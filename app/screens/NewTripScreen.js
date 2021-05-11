import React, { useState } from "react";
import { StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import AppColors from "../config/AppColors";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import DataManager from "../config/DataManager";

function NewBookScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");

  const [titleError, setTitleError] = useState("");
  const [startDateError, setStartDateError] = useState("");

  const doErrorCheck = () => {
    setTitleError(title.length > 0 ? "" : "Please set a valid Title");
    setStartDateError(startDate.length > 0 ? "" : "Please set a valid start");
    return title.length > 0 && startDate.length > 0 ? true : false;
  };

  const addTrip = () => {
    let commonData = DataManager.getInstance();
    let user = commonData.getUserID();

    const newTrip = {
      id: "id" + new Date().getTime(),
      title: title,
      startDate: startDate,

      userid: user,
    };

    console.log(newTrip);
    commonData.addTrip(newTrip);
  };

  return (
    <AppScreen style={{ backgroundColor: AppColors.otherColor }}>
      <AppTextInput
        icon="book-open-page-variant"
        placeholder="Trip Title"
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
        placeholder="Start date"
        value={startDate}
        onChangeText={(inputText) => setStartDate(inputText)}
      />

      {startDateError.length > 0 ? (
        <AppText style={{ margin: 5, color: "red", fontSize: 16 }}>
          {startDateError}
        </AppText>
      ) : (
        <></>
      )}

      <AppButton
        title="Add Trip"
        onPress={() => {
          if (doErrorCheck()) {
            addTrip();
            navigation.navigate("Home", {});
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
    marginBottom: 30,
  },
});

export default NewBookScreen;
