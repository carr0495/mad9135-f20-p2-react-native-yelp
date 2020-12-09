import React from "react";
import { Text, View, Image, Linking } from "react-native";

function DisplayRating(number) {
  console.log(number.number);
  const images = [
    require("../images/regular_0.png"),
    require("../images/regular_1.png"),
    require("../images/regular_2.png"),
    require("../images/regular_3.png"),
    require("../images/regular_4.png"),
    require("../images/regular_5.png"),
  ];
  return (
    <View>
      <Image source={images[number.number]} />
    </View>
  );
}

export default DisplayRating;
