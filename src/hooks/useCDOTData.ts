import { useState, useEffect } from "react";
import axios from "axios";

export default function useCDOTData(): {
  data: any[];
  loading: boolean;
} {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    axios(
      "https://data.cotrip.org/api/v1/incidents?apiKey=E05N15S-Q754ZG9-HFGKVHR-HJCASDJ&limit=10"
    ).then((res) => {
      console.log(res.data.features);
      setData(res.data.features);
      setLoading(false);
    });
  }, []);

  return {
    data,
    loading,
  };
}
