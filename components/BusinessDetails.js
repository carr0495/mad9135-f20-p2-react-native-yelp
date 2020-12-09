import React, { useState, useEffect } from "react";
import { Text, View, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yelpIDFetch } from "../api/yelp.service";
import { helpers } from "../styles/";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import Loader from "./Loader";
import DisplayRating from "./DisplayRating";

function BusinessDetails({ navigation, route }) {
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    console.log("fetching business id information");
    yelpIDFetch(route.params.id)
      .then((data) => {
        setBusinessInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (businessInfo) {
    navigation.setOptions({
      title: businessInfo.name,
    });
    return (
      <SafeAreaView style={helpers.container_lg}>
        <View>
          <Text>{businessInfo.name}</Text>
          {console.log("THIS IS THE IMG THAT I NEED FOR REVIEW")}
          {console.log(`../images/regular_${businessInfo.rating}.png`)}
          <DisplayRating number={businessInfo.rating} />
          <Text>{businessInfo.rating}</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="web"
              size={24}
              color="black"
              onPress={() => Linking.openURL(businessInfo.url)}
            />
            <Entypo
              name="phone"
              size={24}
              color="black"
              onPress={() => Linking.openURL(`tel:${businessInfo.phone}`)}
            />

            {businessInfo.is_closed ? (
              <FontAwesome5 name="door-open" size={24} color="black" />
            ) : (
              <FontAwesome5 name="door-closed" size={24} color="black" />
            )}
          </View>

          <View>
            {businessInfo.location.display_address.map((item) => (
              <Text>{item}</Text>
            ))}
          </View>
          <Text>{businessInfo.phone}</Text>
        </View>

        <View
          style={{
            width: "90%",
            height: "auto",
            flexDirection: "row",
          }}
        >
          {businessInfo.photos.map((item) => (
            <Image source={{ uri: item }} style={{ height: 100, width: 100 }} />
          ))}
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={helpers.container_lg}>
        <Text>
          <Loader />
        </Text>
      </SafeAreaView>
    );
  }
}

export default BusinessDetails;
