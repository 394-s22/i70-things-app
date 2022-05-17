import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";
import { CDotResponse } from "../utils/types";

export default function useCDOTData(): {
  data: CDotResponse | undefined;
  loading: boolean;
} {
  const [data, setData] = useState<CDotResponse | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/getCdotData`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setData(res.data);
      });
  }, []);

  return {
    data,
    loading,
  };
}
