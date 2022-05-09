import { Box, Typography } from "@mui/material";
import * as React from "react";
import useFetchReports from "../hooks/useFetchReports";
import { Report } from "../utils/types";
import ReportFeedItem from "./ReportFeedItem";

const ReportFeed = () => {
  const { reports, loading } = useFetchReports();

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
