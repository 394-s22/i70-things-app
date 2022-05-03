import * as React from "react";
import { Box, Typography, Paper } from "@mui/material/";
import { Report } from "../utils/types";
import PushPinIcon from "@mui/icons-material/PushPin";
import DirectionsIcon from "@mui/icons-material/Directions";

interface ReportCardProps {
  report: Report;
}
// A reportFeedCard
const ReportFeedCard = ({ report }: ReportCardProps) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}
    >
      <Box
        component="img"
        src="https://picsum.photos/600/430?id=828"
        style={{
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          backgroundColor: "red",
          marginRight: "1rem",
        }}
      ></Box>
      <Paper
        elevation={3}
        style={{
          borderRadius: "25px",
          width: "200px",
          textAlign: "left",
          padding: "1rem",
        }}
      >
        <Typography
          component="h2"
          style={{
            fontSize: "2rem",
          }}
        >
          {report.description}
        </Typography>
        <Typography
          style={{
            color: "#3c6ffe",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <PushPinIcon
            style={{
              marginRight: "0.5rem",
              fontSize: "1.25rem",
            }}
          />
          Mile Marker {report.mileMarker}
        </Typography>
        <Typography
          style={{
            color: "#3c6ffe",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <DirectionsIcon
            style={{
              marginRight: "0.5rem",
              fontSize: "1.25rem",
            }}
          />
          {report.direction}
        </Typography>
        <Typography variant="caption">{"2 min ago (14:53)"}</Typography>
      </Paper>
    </Box>
  );
};

export default ReportFeedCard;
