// import React, { useState } from "react";

export async function geolocal() {
  //   const [lat, setLat] = useState("");
  //   const [long, setLong] = useState("");

  if (navigator.geolocation) {
    console.log("working to get geolocation");

    let options = {
      timeout: 30000,
      maximumAge: 75000,
      enableHigherAccuracy: false,
    };
    navigator.geolocation.getCurrentPosition(work, fail, options);
  } else {
    return alert("Time for an upgrade dude.");
  }
}

function work(position) {
  console.log(position);
  //   setLat(postion.coords.latitude);
  //   setLong(position.coords.longitude);
  //   console.log(latitude);
  //   console.log(longitude);
}

function fail(err) {
  //   console.log(err);
  console.log("it failed");
}
