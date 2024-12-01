export const dynamic = 'force-dynamic'; // Disable static rendering

import { google } from "googleapis";
import ParksList from "@/components/ParksList";
import ModalTrigger from "@/components/ModalTrigger";

export default async function Page() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A:O",
  });

  const rows = [];
  const rawRows = res.data.values || [];
  const headers = rawRows.shift();

  if (!headers) {
    return null;
  }

  rawRows.forEach((row) => {
    const rowData = {};
    row.forEach((item, index) => {
      rowData[headers[index]] = item;
    });
    //@ts-ignore
    rows.push(rowData);
  });

  const parks = rows;

  

  return (
    <div className="w-full h-full">
      <ParksList parks={parks} />
      <ModalTrigger />
    </div>
  );
}