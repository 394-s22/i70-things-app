import { useState, useEffect } from "react";

export default async function getCoordinateData(setCoords: (data: any) => void) {
    await fetch('https://data.colorado.gov/resource/4r5f-pb4t.json?route=070A')
    .then(res => res.json())
    .then(res =>{
        setCoords(res)
    })
}
