import * as React from "react";
import { Box, Typography } from "@mui/material";
import useData from "../utils/useData";
import ReportCard from "./ReportCard";
import { Report, ReportArr } from "../utils/types";

const ReportList = () => {
  const [data] = useData<ReportArr>();
  console.log(data);

  return (
    <Box display="flex" flexDirection="column">
      {data ? (
        data.map((report: Report) => {
          return <ReportCard report={report}></ReportCard>;
        })
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ReportList;
