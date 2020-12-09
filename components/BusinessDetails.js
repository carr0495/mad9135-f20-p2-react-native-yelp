import React, { useState, useEffect } from "react";
import { Text, View, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yelpIDFetch } from "../api/yelp.service";
import { colors, helpers } from "../styles/";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import Loader from "./Loader";
import DisplayRating from "./DisplayRating";
import { ScrollView } from "react-native-gesture-handler";

function BusinessDetails({ navigation, route }) {
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    yelpIDFetch(route.params.id)
      .then((data) => {
        setBusinessInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (businessInfo) {
    // navigation.setOptions({
    //   title: businessInfo.name,
    // });
    return (
      <SafeAreaView style={{ flex: 1 }} key={businessInfo.id}>
        <View>
          <Text style={{ fontSize: 20, textAlign: "center", padding: 20 }}>
            {businessInfo.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: colors.gray_regular,
            }}
          >
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

            {businessInfo.is_closed === false ? (
              <FontAwesome5 name="door-open" size={24} color="black" />
            ) : (
              <FontAwesome5 name="door-closed" size={24} color="black" />
            )}
          </View>
          <View style={{ margin: 20 }}>
            <DisplayRating number={businessInfo.rating} />

            <Text>{`${businessInfo.review_count} Reviews`}</Text>

            <View>
              {businessInfo.location.display_address.map((item) => (
                <Text>{item}</Text>
              ))}
            </View>
            <Text>{businessInfo.phone}</Text>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={true}
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
          }}
        >
          {businessInfo.photos.map((item) => (
            <Image
              source={{ uri: item }}
              key={item}
              style={{ height: 300, width: 300 }}
            />
          ))}
        </ScrollView>
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
