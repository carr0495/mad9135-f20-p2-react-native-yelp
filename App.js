import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { yelpFetch } from "./api/yelp.service";
import { geolocal } from "./api/geolocation.service";
import { location, Permissions } from "expo-permissions";

export default function App() {
  const [yelp, setYelp] = useState();
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    yelpFetch()
      .then((data) => {
        setYelp(data);
        // console.log(yelp);
        console.log("this is our fetch data");
        console.log(userLocation);
      })
      .catch((err) => console.log("fetch borked"));
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.location);
    if (status !== "granted") {
      console.log("denied");
    }

    const thisLocation = await Location.getCurrentPositionAsync();
    setUserLocation(thisLocation);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text>Find Food</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "darkorange",
    padding: 10,
    borderRadius: 10,
  },
});
