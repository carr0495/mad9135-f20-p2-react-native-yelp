import React from "react";
import { View, Image } from "react-native";

function DisplayRating(number) {
  const rating = number.number;
  const idx = rating * 2;

  const images = [
    require("../images/regular_0.png"),
    require("../images/regular_0.png"),
    require("../images/regular_1.png"),
    require("../images/regular_1_half.png"),
    require("../images/regular_2.png"),
    require("../images/regular_2_half.png"),
    require("../images/regular_3.png"),
    require("../images/regular_3_half.png"),
    require("../images/regular_4.png"),
    require("../images/regular_4_half.png"),
    require("../images/regular_5.png"),
  ];

  return (
    <View>
      <Image source={images[idx]} />
    </View>
  );
}

export default DisplayRating;
