import { useState, useEffect } from "react";
import { base } from "./airtable";

export default function useFetchRecords<T>(): [T | null] {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    async function onPageLoad() {
      await getData();
    }
    onPageLoad();
  }, []);

  const getData = async () => {
    base("reports")
      .select()
      .eachPage(function page(records, fetchNextPage) {
        const data = records.map((record) => ({
          timestamp: record.get("timestamp"),
          description: record.get("description"),
          direction: record.get("direction"),
          mileMarker: record.get("mileMarker"),
        }));
        // @ts-ignore
        setData(data as T);
        fetchNextPage();
      });
  };
  return [data];
}
