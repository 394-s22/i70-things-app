import React from "react";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
const mapboxgl = require("mapbox-gl");

const MapPage = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmlraGlsMDkyOSIsImEiOiJjbDJvMWFuM3AxMmFtM2JzM2VwbmZhejZmIn0.LQpNYBoPUTZY4q7EpAGOdg";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  return <div id="map"></div>;
};

export default MapPage;
