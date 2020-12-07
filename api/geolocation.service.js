export function geoLocal() {
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
}

function fail(err) {
  console.log("unable to get location");
}
