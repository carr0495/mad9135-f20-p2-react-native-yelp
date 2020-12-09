import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import { helpers, colors } from "./styles";
import { yelpFetch } from "./api/yelp.service";
import YelpData from "./components/YelpData";
import ListYelpData from "./components/ListYelpData";
import BusinessDetails from "./components/BusinessDetails";

export default function App() {
  const [yelp, setYelp] = useState();
  const [input, setInput] = useState("");

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
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: colors.red_dark },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Yelp"
            component={ListYelpData}
            options={{ headerLeft: null, headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="BusinessDetails"
            component={BusinessDetails}
            options={{ title: "Business Details" }}
          />
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
