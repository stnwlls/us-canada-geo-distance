const fs = require("fs");

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getCoordinatesFromPostalCode(code) {
  const normalized = code.replace(/\s/g, "").toUpperCase();

  if (/^\d{5}$/.test(code)) {
    const us = require("../json/us_zipcodes.json");
    const match = us.find((row) => row["Zip Code"] === code);
    if (match) return [+match.ZipLatitude, +match.ZipLongitude];
  }

  const datasets = [
    require("../json/ca_postal_a_m.json"),
    require("../json/ca_postal_n_z.json"),
  ];

  for (const dataset of datasets) {
    const match = dataset.find((row) =>
      row.POSTAL_CODE.replace(/\s/g, "").toUpperCase() === normalized
    );
    if (match) return [+match.LATITUDE, +match.LONGITUDE];
  }

  return null;
}

function getCoordinatesFromAirportCode(iata) {
  const airports = require("../json/airports.json");
  const match = airports.find(
    (row) => row.iata.toUpperCase() === iata.toUpperCase()
  );
  if (match) return [+match.latitude_deg, +match.longitude_deg];
  return null;
}

function main(postalCode, airportCode) {
  const guestCoords = getCoordinatesFromPostalCode(postalCode);
  const airportCoords = getCoordinatesFromAirportCode(airportCode);

  if (!guestCoords || !airportCoords) {
    console.log("Missing data");
    return "Unknown";
  }

  const distance = haversine(
    guestCoords[0],
    guestCoords[1],
    airportCoords[0],
    airportCoords[1]
  );

  return distance <= 100 ? "Yes" : "No";
}

const postalCode = process.argv[2];
const airportCode = process.argv[3];

console.log(main(postalCode, airportCode));
