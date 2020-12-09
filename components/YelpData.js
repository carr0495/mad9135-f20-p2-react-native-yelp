import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Loader from "./Loader";

function YelpData({ yelp }) {
  if (yelp) {
    yelp.businesses.slice(0, 1).map((item) => {
      console.log("these are the names of the resturants " + item.name);
    });
    console.log(Array.isArray(yelp.businesses));
    return (
      <SafeAreaView>
        <View>
          {yelp.businesses.slice(0, 10).map((item, index) => {
            <Text key={index}>{item}</Text>;
          })}
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Loader />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default YelpData;
