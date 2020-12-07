import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { helpers } from "./styles";
import { yelpFetch } from "./api/yelp.service";
import YelpData from "./components/YelpData";

export default function App() {
  const [yelp, setYelp] = useState();
  const [userLong, setUserLong] = useState();
  const [userLat, setUserLat] = useState();
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("fetching data");
    yelpFetch(userLat, userLong, input)
      .then((data) => {
        setYelp(data);
      })
      .catch((err) => console.log(err));
  }, [userLong]);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLat(position.coords.latitude);
        setUserLong(position.coords.longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 75000 }
    );
  }

  function userInputValue() {
    console.log("this is what we are searching for");
    console.log(input);
  }

  return (
    <SafeAreaView style={helpers.container_black}>
      <StatusBar style="auto" />

      {/* <TextInput
        style={{
          height: 40,
          width: "90%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setInput(text)}
        value={input}
        onSubmitEditing={userInputValue}
      /> */}

      <TouchableOpacity onPress={getLocation} style={helpers.button_red}>
        <Text style={helpers.light_text}>Find Food</Text>
      </TouchableOpacity>

      {/* <YelpData style={styles.container} yelp={yelp} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
