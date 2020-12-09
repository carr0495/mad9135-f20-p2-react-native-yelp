import React, { useState, useEffect } from "react";
import { Text, View, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yelpIDFetch, yelpFetchReview } from "../api/yelp.service";
import { colors, helpers } from "../styles/";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import Loader from "./Loader";
import DisplayRating from "./DisplayRating";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "native-base";

function BusinessDetails({ navigation, route }) {
  const [businessInfo, setBusinessInfo] = useState();
  const [businessReview, setBusinessReview] = useState();

  useEffect(() => {
    yelpIDFetch(route.params.id)
      .then((data) => {
        setBusinessInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    yelpFetchReview(route.params.id)
      .then((data) => {
        setBusinessReview(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (businessInfo && businessReview) {
    // navigation.setOptions({
    //   title: businessInfo.name,
    // });
    return (
      <View style={{ flex: 1 }} key={businessInfo.id}>
        <View>
          {/* title */}
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              padding: 20,
              fontWeight: "bold",
            }}
          >
            {businessInfo.name}
          </Text>
          {/* Icons for phone, website, and open/closed */}
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
        </View>
        <ScrollView>
          {/* business information */}
          <View style={{ margin: 20 }}>
            <DisplayRating number={businessInfo.rating} />
            <Text>{`${businessInfo.review_count} Reviews`}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>{businessInfo.price}</Text>
              <Text> • </Text>
              <Text>{`${businessInfo.categories[0].title}`}</Text>
            </View>
            <View>
              {businessInfo.location.display_address.map((item) => (
                <Text>{item}</Text>
              ))}
            </View>
            <Text>{businessInfo.phone}</Text>
          </View>

          {/* images scroll view - horizontal*/}
          <ScrollView
            key={Math.random() * 1000}
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
          {/* resturant reviews */}
          <View>
            {businessReview.reviews.map((item) => (
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.user.image_url }}
                    style={{ height: 50, width: 50, borderRadius: 100 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                  >
                    {item.user.name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 15,
                      marginLeft: 10,
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    {item.time_created}
                  </Text>
                </View>
                <Text>{item.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
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
