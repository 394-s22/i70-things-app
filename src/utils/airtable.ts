import Airtable from "airtable";

export const base = new Airtable({ apiKey: "API_KEY_HERE" }).base(
  "BASE_ID_HERE"
);

export async function createReport(record: {
  description: string;
  direction: "east" | "west";
  mileMarker: number;
  incidentType: string;
  image: string;
}) {
  return new Promise((resolve, reject) => {
    base("reports").create(
      [
        {
          fields: {
            timestamp: new Date().toISOString(),
            description: record.description,
            direction: record.direction === "east" ? "Eastbound" : "Westbound",
            mileMarker: record.mileMarker,
            incidentType: record.incidentType,
            image: record.image,
          },
        },
      ],
      {
        typecast: true,
      },
      function (err, records) {
        if (err) {
          reject(err);
          return;
        }

        resolve(records);
      }
    );
  });
}
