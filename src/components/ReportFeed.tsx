import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import useFetchReports from "../hooks/useFetchReports";
import { Report } from "../utils/types";
import ReportFeedItem from "./ReportFeedItem";
import useCDOTData from "../hooks/useCDOTData";
import { ReportSharp } from "@mui/icons-material";

const ReportFeed = () => {
  const { reports, loading } = useFetchReports();
  const { data } = useCDOTData();

  const [allData, setAllData] = useState<Report[] | null>(null);
  const [directionFilter, setDirectionFilter] = useState<
    null | "Eastbound" | "Westbound"
  >(null);

  const toggleDirection = (direction: "Eastbound" | "Westbound") => {
    if (directionFilter == direction) {
      setDirectionFilter(null);
    } else {
      setDirectionFilter(direction);
    }
  };

  const reportData = [
    ...reports,
    ...(data?.features ?? [])
      .filter((item) => {
        if (item.properties.routeName) {
          return item.properties.routeName.includes("I-70");
        }
      })
      .map((item, i) => {
        return {
          id: String(i),
          description: item.properties.travelerInformationMessage,
          timestamp: item.properties.startTime,
          mileMarker: item.properties.marker,
          direction: item.properties.direction,
        };
      }),
  ];

  if (loading || !reportData) {
    return <Typography variant="h6">Loading...</Typography>;
  }
  console.log(reports);

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt="3rem"
      style={{
        alignItems: "center",
      }}
      paddingBottom="85px"
    >
      <Box marginBottom="15px">
        <Button
          variant={directionFilter === "Eastbound" ? "contained" : "outlined"}
          color="primary"
          onClick={() => toggleDirection("Eastbound")}
          style={{ margin: 5 }}
        >
          Eastbound
        </Button>
        <Button
          variant={directionFilter === "Westbound" ? "contained" : "outlined"}
          style={{ margin: 5 }}
          color="primary"
          onClick={() => toggleDirection("Westbound")}
        >
          Westbound
        </Button>
      </Box>
      {reportData
        .sort(
          (a, z) =>
            new Date(z.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .map((report: any) => {
          if (directionFilter == null || report.direction == directionFilter) {
            return <ReportFeedItem key={report.id} report={report} />;
          }
        })}
    </Box>
  );
};

export default ReportFeed;
