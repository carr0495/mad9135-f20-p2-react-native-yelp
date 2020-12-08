import React, { useEffect, useState } from "react";
import { Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yelpFetch } from "../api/yelp.service";
import { helper, helpers } from "../styles/";
function ListYelpData({ route }) {
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

  if (yelpData) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={helpers.container_lg}
          data={yelpData.businesses}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Text>{lat + " " + long}</Text>
      </SafeAreaView>
    );
  }
}
export default ListYelpData;
