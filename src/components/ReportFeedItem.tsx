import * as React from "react";
import { Box, Typography, Paper } from "@mui/material/";
import { Report } from "../utils/types";

interface ReportCardProps {
  report: Report;
}
// A reportFeedCard
const ReportFeedCard = ({ report }: ReportCardProps) => {
  return (
    <Box style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem",
    }}>
      <Box component="img" src="https://picsum.photos/600/430?id=828"
      style={{
          borderRadius: "50%",
          width:"100px",
          height: "100px",
          backgroundColor: "red",
          marginRight: "1rem",
        }}></Box>
      <Paper
        elevation={3}
        style={{
          borderRadius: "25px",
          width: "200px",
          textAlign: "left",
          padding: "1rem",
        }}
      >
        <Typography>Description: {report.description}</Typography>
        <Typography>{report.timestamp}</Typography>
        <Typography>Mile Marker: {report.mileMarker}</Typography>
        <Typography>{report.direction}</Typography>
      </Paper>
    </Box>
  );
};

export default ReportFeedCard;
