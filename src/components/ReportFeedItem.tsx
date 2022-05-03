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
    </Box>
  );
};

export default ReportFeedCard;
