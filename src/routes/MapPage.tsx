//@ts-nocheck
import { Box } from "@mui/material";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
//import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import useFetchReports from "../hooks/useFetchReports.ts";
import getCoordinateData, { markerToCoords } from "../utils/getCoordinateData";
// const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken =
    "pk.eyJ1IjoibmlraGlsMDkyOSIsImEiOiJjbDJvMWFuM3AxMmFtM2JzM2VwbmZhejZmIn0.LQpNYBoPUTZY4q7EpAGOdg";

const MapPage = ({ setOrigin, setDestination, getDst, getOrg }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom] = useState(5);

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
    //   const [origin, setOrigin] = useState(null);
    //   const [destination, setDestination] = useState(null);

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
            interactive: false
        });

        directions.on("origin", (e) => {
            setOrigin(e.feature.geometry.coordinates)
            filterReport()
        });


        directions.on("destination", (e) => {
            setDestination(e.feature.geometry.coordinates)
            filterReport()
        });

        function filterReport() {
            let org = getOrg()
            let dst = getDst()
            console.log('origin ', org, ' dest ', destination)
            if (org && dst) {
                var farRight = Math.max(org[1], dst[1]);
                var farLeft = Math.min(org[1], dst[1]);
                console.log('limits', farRight, farLeft)
                reports.filter(report => {
                    console.log('report', report.long, report.lat)
                    if (report.long < farRight & report.long > farLeft) {
                        return true
                    }
                    return false
                })
            }
        }



        map.addControl(directions, "top-left");
        map.on("data", () => {
            setMapLoaded(true);
        });

        mapRef.current = map;

        return () => {
            map.off("data");
        };
    }, [lat, lng, zoom]);

    useEffect(() => {
        console.log(mapRef.current);
        if (loading || !mapLoaded) {
            return;
        }

        reports.forEach((report) => {
            if (report.lat && report.long) {
                var popup = new mapboxgl.Popup().setText(report.description);
                new mapboxgl.Marker()
                    .setLngLat({ lon: report.long, lat: report.lat })
                    .addTo(mapRef.current)
                    .setPopup(popup);
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
