import * as React from "react";
import { Box, Typography } from "@mui/material";
import useData from "../utils/useData";
import ReportFeedItem from "./ReportFeedItem";
import { Report, ReportArr } from "../utils/types";

const ReportFeed = () => {
  const [data] = useData<ReportArr>();
  console.log(data);

  // Use this just in case
  const fakeData: Report = {
    description: "description",
    timestamp: "timeStamp",
    mileMarker: 419.99,
    direction: "direction",
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt="3rem"
      style={{
        alignItems: "flex-end",
        marginRight: "25px",
      }}
    >
      {data ? (
        data.map((report: Report) => {
          return <ReportFeedItem report={report} />;
        })
      ) : (
        //This is technically not needed, and we should replace with some error signaling if data never comes
        <ReportFeedItem report={fakeData} />
      )}
    </Box>
  );
};

export default ReportFeed;