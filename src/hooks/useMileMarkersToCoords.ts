import { useState, useEffect } from "react";

export default function useMileMarkerToCoords():any {
    const [data, setData] = useState<any | undefined>();

    useEffect(() =>{
        fetch('https://data.colorado.gov/resource/4r5f-pb4t.json?route=070A')
        .then(res => res.json())
        .then(res =>{
            setData(res)
            
        })
    })
    return data
}
