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

export interface CdotFeature {
  type: string;
  geometry: {
    srid: number;
    type: string;
    coordinates: number[];
  };
  properties: {
    severity: string;
    clearTime: Date;
    injuries: number;
    type: string;
    laneImpacts: {
      direction: string;
      laneCount: number;
      laneClosures: string;
      closedLaneTypes: string[];
    }[];
    routeName: string;
    isOversizedLoadsProhibited: boolean;
    lastUpdated: Date;
    vehiclesInvolved: number;
    marker: number;
    fatalities: number;
    hasRampRestriction: boolean;
    startTime: Date;
    id: string;
    travelerInformationMessage: string;
    responseLevel: string;
    jurisdictions: string[];
    status: string;
    direction: string;
    landmark: string;
    responseSigns: {
      id: string;
      message: string;
    }[];
  };
}

export interface CDotResponse {
  type: "FeaturesCollection";
  features: CdotFeature[];
}
