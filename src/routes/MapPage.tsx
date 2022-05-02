//@ts-nocheck
import React from "react";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import {useRef, useState, useEffect} from "react";
import { height } from "@mui/system";
// const mapboxgl = require("mapbox-gl");
mapboxgl.accessToken =
  "pk.eyJ1IjoibmlraGlsMDkyOSIsImEiOiJjbDJvMWFuM3AxMmFtM2JzM2VwbmZhejZmIn0.LQpNYBoPUTZY4q7EpAGOdg";


const MapPage = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });
  
  return <div style={{height:"400px"}} ref={mapContainer}></div>;
};

export default MapPage;
