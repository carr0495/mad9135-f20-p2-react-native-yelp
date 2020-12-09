export function getLocation(setUserLat, setUserLong) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    },
    (error) => {
      if (error.code == error.PERMISSION_DENIED) {
        setUserLat(45.3415);
        setUserLong(-75.7556);
      }
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 75000 }
  );
}
