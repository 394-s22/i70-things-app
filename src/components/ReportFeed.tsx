import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import useFetchReports from "../hooks/useFetchReports";
import { Report } from "../utils/types";
import ReportFeedItem from "./ReportFeedItem";
import useCDOTData from "../hooks/useCDOTData";
import { ReportSharp } from "@mui/icons-material";

const ReportFeed = () => {
  const { reports, loading } = useFetchReports();
  const { data, dataLoading } = useCDOTData();

  const [allData, setAllData] = useState<Report[] | null>(null);

  const reportData = [
    ...reports,
    ...data.map((item, i) => {
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt="3rem"
      style={{
        alignItems: "center",
      }}
    >
      {reportData
        .sort(
          (a, z) =>
            new Date(z.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .map((report: Report) => (
          <ReportFeedItem key={report.id} report={report} />
        ))}
    </Box>
  );
};

export default ReportFeed;
