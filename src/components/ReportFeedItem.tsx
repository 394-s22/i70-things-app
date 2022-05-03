import * as React from "react";
import { Box, Typography } from "@mui/material/";
import { Report } from "../utils/types";

interface ReportCardProps {
  report: Report;
}

const ReportFeedCard = ({ report }: ReportCardProps) => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#aaa" }}>
      <Typography>Description: {report.description}</Typography>
      <Typography>Time Stamp: {report.timestamp}</Typography>
      <Typography>Mile Marker: {report.mileMarker}</Typography>
      <Typography>Direction: {report.direction}</Typography>
    </Box>
  );
};

export default ReportFeedCard;
