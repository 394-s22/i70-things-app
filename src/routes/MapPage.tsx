//@ts-nocheck
import React from "react";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import {useRef, useState, useEffect} from "react";
import { height } from "@mui/system";
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
  const [lng, setLng] = useState(-106.6);
  const [lat, setLat] = useState(39.55);
  const [zoom, setZoom] = useState(8);

  const { reports, loading } = useFetchReports();

  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });
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
