import * as React from "react";
import { Box, Typography, Paper } from "@mui/material/";
import { Report } from "../utils/types";
import PushPinIcon from "@mui/icons-material/PushPin";
import DirectionsIcon from "@mui/icons-material/Directions";

interface ReportCardProps {
  report: Report;
}

// Credit: https://muffinman.io/blog/javascript-time-ago-function/
const timeAgo = (dateParam: any) => {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today: any = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes/60);
  const days = Math.round(hours/24)
  const months = Math.round(days/30)
  const years = Math.round(months/12)
  const isYesterday = yesterday.toDateString() === date.toDateString();


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${ seconds } seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${ minutes } minutes ago`;
  } else if (hours < 24){
    return `${ hours } hours ago`;
  } else if (isYesterday) {
    return `yesterday`;
  } else if (days < 30){
    return `${ days } days ago`;
  } else if (months < 12) {
    return `${ months } months ago`;
  } else {
    return `${ years } years ago`;
  }
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
