import * as React from "react";
import { Box, Typography } from "@mui/material";
import useData from "../utils/useData";
import ReportFeedItem from "./ReportFeedItem";
import { Report, ReportArr } from "../utils/types";

const ReportFeed = () => {
  const [data] = useData<ReportArr>();
  console.log(data);

  const fakeData: Report = {
    description: "description",
    timestamp: "timeStamp",
    mileMarker: 419.99,
    direction: "direction"
  }

  return (
    <Box display="flex" flexDirection="column">
      {data ? (
        data.map((report: Report) => {
          return <ReportFeedItem report={report} />;
        })
      ) : (
      <ReportFeedItem report={fakeData} />
      )}
    </Box>
  );
};

export default ReportFeed;
