import React from "react";
import { View, Text } from "react-native";

function YelpData({ yelp }) {
  return (
    <View>
      <Text>{JSON.stringify(yelp.businesses[0].name)}</Text>
    </View>
  );
}

export default YelpData;
