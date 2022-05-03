import * as React from "react";
import { Box, Typography, Paper } from "@mui/material/";
import { Report } from "../utils/types";

interface ReportCardProps {
  report: Report;
}

const ReportFeedCard = ({ report }: ReportCardProps) => {
  return (
    <Paper
      elevation={3}
      style={{
        marginBottom: "1rem",
        borderRadius: "25px",
        width: "250px",
      }}
    >
      <Typography>Description: {report.description}</Typography>
      <Typography>Time Stamp: {report.timestamp}</Typography>
      <Typography>Mile Marker: {report.mileMarker}</Typography>
      <Typography>Direction: {report.direction}</Typography>
    </Paper>
  );
};

export default ReportFeedCard;
