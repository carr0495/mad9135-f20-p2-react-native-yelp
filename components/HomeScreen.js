import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { helpers } from "../styles";
import { getLocation } from "../api/geolocation.service";

function HomeScreen(props) {
  const [userLong, setUserLong] = useState();
  const [userLat, setUserLat] = useState();

  return (
    <SafeAreaView style={helpers.container_lg}>
      <TouchableOpacity
        onPress={getLocation(setUserLat, setUserLong)}
        style={helpers.button_red}
      >
        <Text style={helpers.light_text}>Find Food</Text>
      </TouchableOpacity>
      <Text>{userLat + " " + userLong}</Text>
    </SafeAreaView>
  );
}
export default HomeScreen;
