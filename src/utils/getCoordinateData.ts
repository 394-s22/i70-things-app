import { useState, useEffect } from "react";

export default async function getCoordinateData(
  setCoords: (data: any) => void
) {
  await fetch("https://data.colorado.gov/resource/4r5f-pb4t.json?route=070A?")
    .then((res) => res.json())
    .then((res) => {
      setCoords(res);
    });
}

export async function markerToCoords(
  mileMarker: number,
  callback: (coord: any) => void
) {
  await fetch(
    `https://data.colorado.gov/resource/4r5f-pb4t.json?route=070A&ref_pt=${mileMarker}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res[0].the_geom.coordinates);
      callback(res[0].the_geom.coordinates);
    });
}
