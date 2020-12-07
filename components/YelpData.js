import React from "react";
import { View, Text } from "react-native";

function YelpData({ yelp }) {
  if (yelp.businesses) {
    return (
      <View>
        <Text>{JSON.stringify(yelp.businesses[0].name)}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Nothing Yet</Text>
      </View>
    );
  }
}

export default YelpData;
