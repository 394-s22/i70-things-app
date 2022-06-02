//@ts-nocheck
import { Box } from "@mui/material";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import useFetchReports from "../hooks/useFetchReports.ts";
import getCoordinateData, { markerToCoords } from "../utils/getCoordinateData";
// const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken =
// placeholder
  "pk.eyJ1IjoibmlraGlsMDkyOSIsImEiOiJjbDJvMWFuM3AxMmFtM2JzM2VwbmZhejZmIn0.LQpNYBoPUTZY4q7EpAGOdg";

const MapPage = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  const { reports, loading } = useFetchReports();

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Removed to allow the map to use the lng and lat properties.
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 15,
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);

        console.log("done", lng, lat, position);
        mapRef.current.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
        });
      },
      () => {
        setLat(0);
        setLng(0);
      },
      {
        enableHighAccuracy: false,
      }
    );

    const nav = new mapboxgl.NavigationControl();

    map.addControl(nav, "top-right");

    var directions = new MapboxDirections({
      controls: {
        instructions: window.innerWidth > 800 ? true : false,
        // instructions: true,
        profileSwitcher: false,
      },
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/driving",
      interactive: false,
      placeholderOrigin: "Current Location",
    });

    map.addControl(directions, "top-left");

    map.on("data", () => {
      setMapLoaded(true);
    });

    map.on("load", async function () {
      navigator.geolocation.getCurrentPosition((position) => {
        directions.setOrigin([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      });
    });

    mapRef.current = map;

    return () => {
      map.off("data");
    };
  }, []);

  useEffect(() => {
    if (loading || !mapLoaded) {
      return;
    }

    reports.forEach((report) => {
      if (report.mileMarker !== "undefined") {
        markerToCoords(report.mileMarker, (coords) => {
          var popup = new mapboxgl.Popup().setText(report.description);
          new mapboxgl.Marker()
            .setLngLat([coords[0], coords[1]])
            .addTo(mapRef.current)
            .setPopup(popup);
        });
      }
    });
  }, [reports, loading, mapLoaded]);

  return (
    <Box
      style={{ height: "calc(100vh-120px)", top:"60px" }}
      height="calc(100vh - 128px)"
      ref={mapContainer}
    />
  );
};

export default MapPage;
