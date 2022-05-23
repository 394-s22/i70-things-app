//@ts-nocheck
import { Box } from "@mui/material";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import useFetchReports from "../hooks/useFetchReports.ts";
import getCoordinateData, { markerToCoords } from "../utils/getCoordinateData";
// const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlraGlsMDkyOSIsImEiOiJjbDJvMWFuM3AxMmFtM2JzM2VwbmZhejZmIn0.LQpNYBoPUTZY4q7EpAGOdg";

const MapPage = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom] = useState(15);

  const { reports, loading } = useFetchReports();

  const successLocation = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };

  const errorLocation = () => {
    setLat(0);
    setLng(0);
  };

  const [mapLoaded, setMapLoaded] = useState(false);
  const [semanticLocation, setSemanticLocation] = useState("");

  useEffect(() => {
    // Removed to allow the map to use the lng and lat properties.
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

    var directions = new MapboxDirections({
      controls: {
        profileSwitcher: false,
      },
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/driving",
      placeholderOrigin: semanticLocation,
    });

    map.addControl(directions, "top-left");
    map.on("data", () => {
      setMapLoaded(true);
    });

    map.on("load", async function () {
      directions.setOrigin([lng, lat]);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=${mapboxgl.accessToken}`;
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (!jsonResponse.features[0]) {
            setSemanticLocation("Choose starting location");
          } else {
            setSemanticLocation(jsonResponse.features[0].place_name);
          }
        });
    });

    mapRef.current = map;

    return () => {
      map.off("data");
    };
  }, [lat, lng, zoom, semanticLocation]);

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
      style={{ height: "calc(100vh-120px)" }}
      height="calc(100vh - 128px)"
      ref={mapContainer}
    ></Box>
  );
};

export default MapPage;
