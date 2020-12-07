const KEY =
  "3c5DeM0fqMIN81zErtwAFqCK23uPx_tVVnGNY_yedYFhXjLtCK_dXCLyFIayyMWqn67VMT7jWXE-CArj3t1Tcm9dzk47_o1EEf6SyEJRTVJI5H5IsulDEdgTJ13NX3Yx";

async function yelpFetchBusiness(lat, long, input) {
  const url = `https://api.yelp.com/v3/businesses/search?term=${input}&latitude=${lat}&longitude=${long}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export async function yelpFetch(lat, long, input) {
  const data = await yelpFetchBusiness(lat, long, input);
  return data;
}
