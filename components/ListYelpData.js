import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yelpFetch } from "../api/yelp.service";
import { helpers } from "../styles/";
import Loader from "./Loader";
function ListYelpData({ navigation, route }) {
  const [yelpData, setYelpData] = useState();

  const lat = route.params.lat;
  const long = route.params.long;

  useEffect(() => {
    console.log("allo");
    yelpFetch(lat, long)
      .then((data) => {
        setYelpData(data);
        console.log(data);
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
      <View>
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text>{item.rating + "/5"}</Text>
        <Text>{"distance: " + Math.round(item.distance / 1000) + "/km"}</Text>
      </View>
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onPress={() => {
        navigation.navigate("BusinessDetails", { id: item.id });
      }}
      key={item.id}
    />
  );

  if (yelpData) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
