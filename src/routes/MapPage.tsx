//@ts-nocheck
import { Box } from "@mui/material";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import useFetchReports from "../hooks/useFetchReports.ts";
import useMileMarkerToCoords from "../hooks/useMileMarkersToCoords";
// const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlraGlsMDkyOSIsImEiOiJjbDJvMWFuM3AxMmFtM2JzM2VwbmZhejZmIn0.LQpNYBoPUTZY4q7EpAGOdg";

const MapPage = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(15);

  const { reports, loading } = useFetchReports();
  const coords = useMileMarkerToCoords();
  console.log('coords: ', coords)

  const successLocation = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };

  const errorLocation = () => {
    setLat(0);
    setLng(0);
  };

  useEffect(() => {
    // Removed to allow the map to use the lng and lat properties.
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "top-right");

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/driving",
    });

    map.current.addControl(directions, "top-left");
  }, [lat, lng, zoom]);

  return (
    <Box
      style={{ height: "calc(100vh-120px)" }}
      height="calc(100vh - 128px)"
      ref={mapContainer}
    ></Box>
  );
};

export default MapPage;
