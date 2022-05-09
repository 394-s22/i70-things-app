import { Attachment } from "airtable";
import { useState, useEffect } from "react";
import { base } from "../utils/airtable";
import { Report } from "../utils/types";

export default function useFetchReports(): {
  reports: Report[];
  loading: boolean;
} {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function onPageLoad() {
      base("reports")
        .select()
        .eachPage(function page(records, fetchNextPage) {
          const data = records.map((record) => {
            const imageAttachments = record.get("image") as
              | Attachment[]
              | undefined;

            return {
              id: record.id,
              timestamp: record.get("timestamp"),
              description: record.get("description"),
              direction: record.get("direction"),
              mileMarker: record.get("mileMarker"),
              image: imageAttachments?.[0],
            };
          });

          setReports(data as Report[]);
          setLoading(false);
          fetchNextPage();
        });
    }

    onPageLoad();
  }, []);

  return {
    reports,
    loading,
  };
}
