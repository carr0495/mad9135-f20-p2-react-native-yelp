export function getLocation(setUserLat, setUserLong) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 75000 }
  );
}
