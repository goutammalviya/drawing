import { GoogleSpreadsheet } from "google-spreadsheet";
import React, { useState, useEffect } from "react";
import creds from "../cred/credentials.json";
function useSheetService( sheetId, sheetName) {
  // console.log( sheetId, sheetName);

  const [sheet, setSheet] = useState(null);


  useEffect(() => {
    const asyncFn = async () => {
      let tSheet = await sheetService(sheetName);
      console.log(tSheet);
      setSheet(tSheet);
     
    };
    asyncFn();
  }, []);

  const getSheetRows = async sheet => {
    if (sheet === null) {
      console.log("sheets is null");
      sheet = await sheetService(sheetName);
    }
    return await sheet.getRows();
  };
  const addRow = async (sheet, data) => {
    if (sheet === null) {
      console.log("sheets is null");
      sheet = await sheetService(sheetName);
    }
    return await sheet.addRow(data);
  };
  const addRows = async (sheet, data) => {
    if (sheet === null) {
      console.log("sheets is null");
      sheet = await sheetService(sheetName);
    }
    return await sheet.addRows(data);
  };

  const sheetService = async sheetName => {
    const doc = new GoogleSpreadsheet(sheetId);
    const gSheetInit = async () => {
      try {
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();
      } catch (e) {
        console.error("Error LoadDocInfo: ", e);
      }
    };

    await gSheetInit();
    return doc.sheetsByTitle[sheetName];
  };
  return { getSheetRows,addRows, addRow,sheet};
}
export default useSheetService;
