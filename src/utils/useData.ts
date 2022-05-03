import { useState, useEffect } from "react";
import axios from "axios";
import { Report } from "./types";

export default function useData<T>(): [T | null] {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function onPageLoad() {
      await getData();
    }
    onPageLoad();
  }, []);

  const getData = async () => {
    return axios.get("/").then((res) => {
      //@ts-ignore
      const formattedResult = res.data.records.map((record) => {
        return record.fields;
      });
      setData(formattedResult);
    });
  };
  return [data];
}
