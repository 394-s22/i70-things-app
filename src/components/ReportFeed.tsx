import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import useFetchReports from "../hooks/useFetchReports";
import { Report } from "../utils/types";
import ReportFeedItem from "./ReportFeedItem";
import useCDOTData from "../hooks/useCDOTData";
import { ReportSharp } from "@mui/icons-material";

const ReportFeed = () => {
  const { reports, loading } = useFetchReports();
  const { data } = useCDOTData();

  const [allData, setAllData] = useState<Report[] | null>(null);

  const reportData = [
    ...reports,
    ...(data?.features ?? [])
      .filter((item) => {
        if (item.properties.routeName) {
          return item.properties.routeName.includes("I-70");
        }
      })
      .map((item, i) => {
        return {
          id: String(i),
          description: item.properties.travelerInformationMessage,
          timestamp: item.properties.startTime,
          mileMarker: item.properties.marker,
          direction: item.properties.direction,
        };
      }),
  ];

  if (loading || !reportData) {
    return <Typography variant="h6">Loading...</Typography>;
  }
  console.log(reports);

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt="3rem"
      style={{
        alignItems: "center",
      }}
      paddingBottom="85px"
    >
      {reportData
        .sort(
          (a, z) =>
            new Date(z.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .map((report: any) => (
          <ReportFeedItem key={report.id} report={report} />
        ))}
    </Box>
  );
};

export default ReportFeed;
