import { Attachment } from "airtable";

export type Report = {
  id: string;
  description: string;
  timestamp: string;
  mileMarker: number;
  direction: string;
  image?: string;
};

export type ReportArr = Report[];
