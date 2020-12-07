import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { yelpFetch } from "./api/yelp.service";
import { geolocal } from "./api/geolocation.service";

export default function App() {
  const [yelp, setYelp] = useState();
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    yelpFetch()
      .then((data) => {
        setYelp(data);
        console.log("this is our fetch data");
        console.log(userLocation);
      })
      .catch((err) => console.log("fetch borked"));
  }, []);

  useEffect(() => {
    geolocal();
  }, []);

  // getLocation = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.location);
  //   if (status !== "granted") {
  //     console.log("denied");
  //   }

  //   const thisLocation = await Location.getCurrentPositionAsync();
  //   setUserLocation(thisLocation);
  // };

  return (
    <View style={styles.container}>
      <Text>mike branch</Text>
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
});
