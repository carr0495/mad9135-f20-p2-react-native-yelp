import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yelpFetch } from "../api/yelp.service";
import { helpers } from "../styles/";
import DisplayRating from "./DisplayRating";
import Loader from "./Loader";

function ListYelpData({ navigation, route }) {
  const [yelpData, setYelpData] = useState();

  const lat = route.params.lat;
  const long = route.params.long;

  useEffect(() => {
    yelpFetch(lat, long)
      .then((data) => {
        data.businesses.sort(function (a, b) {
          return a.distance - b.distance;
        });
        setYelpData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        borderBottomColor: "lightgray",
        borderWidth: 1,
        justifyContent: "space-between",
        borderTopWidth: 0,
        flexDirection: "row",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={item.image_url ? { uri: item.image_url } : null}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={{ textAlign: "right", position: "absolute", right: 0 }}>
            {parseFloat(item.distance / 1000).toFixed(2) + " km"}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, width: "85%", marginBottom: 5 }}>
              {item.name}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <DisplayRating number={item.rating} />
            <Text
              style={{ paddingLeft: 10, marginBottom: 5 }}
            >{`${item.review_count} reviews`}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>{item.price}</Text>
            <Text> • </Text>
            <Text>{`${item.categories[0].title}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onPress={() => {
        navigation.navigate("BusinessDetails", { id: item.id });
      }}
      key={(item) => item.id}
      title={(item) => item}
    />
  );

  if (yelpData) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <FlatList
          data={yelpData.businesses}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          key={(item) => item.id}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Loader />
      </SafeAreaView>
    );
  }
}
export default ListYelpData;
