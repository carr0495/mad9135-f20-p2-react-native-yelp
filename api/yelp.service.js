const KEY =
  "3c5DeM0fqMIN81zErtwAFqCK23uPx_tVVnGNY_yedYFhXjLtCK_dXCLyFIayyMWqn67VMT7jWXE-CArj3t1Tcm9dzk47_o1EEf6SyEJRTVJI5H5IsulDEdgTJ13NX3Yx";

async function yelpFetchBusiness(lat, long) {
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${long}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function yelpFetchBusinessWithID(id) {
  const url = `https://api.yelp.com/v3/businesses/${id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export async function yelpFetch(lat, long) {
  const data = await yelpFetchBusiness(lat, long);
  return data;
}

export async function yelpIDFetch(id) {
  const data = await yelpFetchBusinessWithID(id);
  return data;
}
