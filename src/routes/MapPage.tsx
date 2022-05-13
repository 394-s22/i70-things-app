//@ts-nocheck
import React from "react";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import {useRef, useState, useEffect} from "react";
import ReportFeedItem from "../components/ReportFeedItem.tsx";
import useFetchReports from "../hooks/useFetchReports.ts";
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom"
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


  const successLocation = position => {
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }

  const errorLocation = () => {
    setLat(0)
    setLng(0)
  }


  useEffect(() => {
    // Removed to allow the map to use the lng and lat properties.
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true})



    const nav = new mapboxgl.NavigationControl()
    map.current.addControl(nav, 'top-right')


    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: 'mapbox/driving'
    });

    map.current.addControl(directions, "top-left")
  }, [lat, lng, zoom]);


  return (
  <div>
    <div style={{height:"350px", margin: "4em", marginBottom: "0px"}} ref={mapContainer}>
    </div>
    <Typography sx={{padding: 1}} fontSize="1.2em">Recent reports</Typography>
    {!loading && <Box display="flex"
      flexDirection="column"
      m="auto"
      maxWidth="400px"
      ><ReportFeedItem report={reports[0]}/></Box>}
      <Link to="/feed"><Typography color="#666" display="inline-block">See all reports →</Typography></Link>
  </div>);
};

export default MapPage;
