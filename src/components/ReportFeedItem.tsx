import * as React from "react";
import { Box, Typography, Paper, Modal } from "@mui/material/";
import { Report } from "../utils/types";
import PushPinIcon from "@mui/icons-material/PushPin";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useState } from "react";
interface ReportCardProps {
  report: Report;
}

// Credit: https://muffinman.io/blog/javascript-time-ago-function/
const timeAgo = (dateParam: any) => {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today: any = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (isYesterday) {
    return `yesterday`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// A reportFeedCard
const ReportFeedCard = ({ report }: ReportCardProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
        width: "400px",
      }}
    >
      <Paper
        elevation={3}
        style={{
          borderRadius: "25px",
          width: "100%",
          textAlign: "left",
          padding: "1rem",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
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
            <Typography variant="caption">
              {timeAgo(report.timestamp)}
            </Typography>
          </Box>
          {report.image && (
            <Box>
              <Box
                onClick={handleOpen}
                component="img"
                //@ts-ignore
                src={report.image.url}
                style={{
                  borderRadius: "18px",
                  width: "100px",
                  height: "100px",
                  backgroundColor: "red",
                  marginRight: "1rem",
                  flexShrink: 0,
                }}
              ></Box>

              <Modal open={open} onClose={handleClose}>
                <Box
                  onClick={handleOpen}
                  component="img"
                  //@ts-ignore
                  src={report.image.url}
                  sx={style}
                ></Box>
              </Modal>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ReportFeedCard;
