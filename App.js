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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import { helpers, colors } from "./styles";
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

  function userInputValue() {
    console.log("this is what we are searching for");
    console.log(input);
  }
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.red_dark },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
//region PREVIOUS TEXT INPUT
{
  /* <TextInput
  style={{
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
  }}
  onChangeText={(text) => setInput(text)}
  value={input}
  onSubmitEditing={userInputValue}
/> */
}
{
  /* <YelpData style={styles.container} yelp={yelp} /> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
