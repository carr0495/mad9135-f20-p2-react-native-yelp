import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { helpers } from "../styles";
import { getLocation } from "../api/geolocation.service";
import Loader from "./Loader";

function HomeScreen({ navigation }) {
  const [userLong, setUserLong] = useState();
  const [userLat, setUserLat] = useState();

  useEffect(() => {
    console.log("top");
    getLocation(setUserLat, setUserLong);
    console.log("bottom");
  }, []);

  if (userLat && userLong) {
    return (
      <SafeAreaView style={helpers.container_lg}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Yelp", { lat: userLat, long: userLong })
          }
          style={helpers.button_red}
        >
          <Text style={helpers.light_text}>Find Food</Text>
        </TouchableOpacity>
        {/* <Text>{userLat + " " + userLong}</Text> */}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={helpers.container_lg}>
        <Loader />
        <Text>Getting Location</Text>
      </SafeAreaView>
    );
  }
}
export default HomeScreen;
