import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "native-base";
import { colors } from "../styles";
function Loader(props) {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View>
      <Spinner color={colors.red_dark} />
    </View>
  );
}
export default Loader;
