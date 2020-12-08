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

function BusinessDetails({ route }) {
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    console.log("fetching business id information");
    yelpIDFetch(route.params.id)
      .then((data) => {
        setBusinessInfo(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (businessInfo) {
    return (
      <SafeAreaView style={helpers.container_lg}>
        <View>
          <Text>{businessInfo.name}</Text>

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
      <SafeAreaView>
        <Text>
          We are working hard to look for the restuarant for you! Please sit
          tight!
        </Text>
      </SafeAreaView>
    );
  }
}

export default BusinessDetails;
