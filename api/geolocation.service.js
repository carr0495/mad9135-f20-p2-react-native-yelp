import { defined } from "react-native-reanimated";

export function getLocation(setUserLat, setUserLong) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    },
    (error) => {
      console.log(error);
      console.log("denied");
      setUserLat(45.3415);
      setUserLong(-75.7556);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 75000 }
  );
}
