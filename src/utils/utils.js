export const arrayToQueryString = (arr, field) => {
  const string = arr.join(",").replace(/,/gi, " or ");
  const finalQuery = `${string} in ${field}`;
  return string;
};

export const arrayToWhereString = (arr) => {
  const filteredArr = arr.filter((str) => str !== "");
  const string = filteredArr.join(",").replace(/,(?![^()]*\))/gi, " AND ");
  // const string = filteredArr.join(",").replace(/,/gi, " AND ")

  return string;
};

export const capitalizeSentence = (str) => {
  const strWithSpaces = str.replace(/_/gi, " ");
  const result = strWithSpaces.charAt(0).toUpperCase() + strWithSpaces.slice(1);
  return result;
};

export const calculateBoundingBox = (latitude, longitude, radiusKm) => {
  //AI GENERATED CODE, DONT WANT TO FOOL ANYONE
  //its ment to calculate, the parameters I want to use in the coordenates filter.
  //gives the parameters of a polygon 10km around the given location

  // Earth's radius in kilometers
  const earthRadiusKm = 6371;

  // Convert the radius from kilometers to radians
  const radiusRadians = radiusKm / earthRadiusKm;

  // Convert latitude and longitude from degrees to radians
  const latRad = (latitude * Math.PI) / 180;
  const lonRad = (longitude * Math.PI) / 180;

  // Calculate the minimum and maximum latitude and longitude
  const minLat = latRad - radiusRadians;
  const maxLat = latRad + radiusRadians;

  // Calculate the angular distance in radians for the radius
  const deltaLon = Math.asin(Math.sin(radiusRadians) / Math.cos(latRad));

  // Calculate the minimum and maximum longitude
  const minLon = lonRad - deltaLon;
  const maxLon = lonRad + deltaLon;

  // Convert back to degrees
  const minLatDeg = (minLat * 180) / Math.PI;
  const minLonDeg = (minLon * 180) / Math.PI;
  const maxLatDeg = (maxLat * 180) / Math.PI;
  const maxLonDeg = (maxLon * 180) / Math.PI;

  return {
    minLat: minLatDeg,
    minLon: minLonDeg,
    maxLat: maxLatDeg,
    maxLon: maxLonDeg,
  };
};

export const getCoordenates = (coordenates) => {
  const numbersArray = coordenates.split(",").map((str) => parseFloat(str.trim()));
  const [lat, lon] = numbersArray;
  const polygon = calculateBoundingBox(lat, lon, 10);
  return polygon
};
