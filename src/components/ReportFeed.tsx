import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import useFetchReports from "../hooks/useFetchReports";
import { Report } from "../utils/types";
import ReportFeedItem from "./ReportFeedItem";
import useCDOTData from "../hooks/useCDOTData";

const ReportFeed = () => {
  const { reports, loading } = useFetchReports();
  const { data, dataLoading } = useCDOTData();

  const [allData, setAllData] = useState<Report[]|null>(null);
  useEffect(() => {
    //const reportedData = data.map((x) => new Report())
    setAllData(reports.concat(data));
  }, [reports, data]);

  if (loading) {
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
      {reports
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
