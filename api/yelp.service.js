const BASE_URL =
  "https://api.yelp.com/v3/businesses/search?term=starbucks&location=ottawa";
const KEY =
  "3c5DeM0fqMIN81zErtwAFqCK23uPx_tVVnGNY_yedYFhXjLtCK_dXCLyFIayyMWqn67VMT7jWXE-CArj3t1Tcm9dzk47_o1EEf6SyEJRTVJI5H5IsulDEdgTJ13NX3Yx";

async function yelpFetchBusiness() {
  const url = `${BASE_URL}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

// export async function fetchHistoricCurrency(startDate, endDate, base, unit) {
//   if (base === "") {
//     base = DEFAULT_VALUE;
//   }
//   const url = `${BASE_URL}history?base=${base}&symbols=${unit}&start_at=${startDate}&end_at=${endDate}`;
//   const response = await fetch(url);
//   if (!response.ok) throw new Error(response.statusText);
//   return response.json();
// }

export async function yelpFetch() {
  const data = await yelpFetchBusiness();
  return data;
}
