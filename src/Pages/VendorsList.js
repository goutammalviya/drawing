import React, { useEffect, useState } from "react";
import sheetService, { getSheetRows, addRow } from "../Services/SheetService2";
import { useNavigate } from "react-router-dom";

const VendorsList = () => {
  let sheet = null;
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const asyncFn = async () => {
      const sheets = await sheetService("vendors");
      sheet = sheets;
      let data = await getSheetRows(sheet);
      setVendors(data);
    };
    asyncFn();
  }, []);

  return (
    <>
      <div className="d-flex">
        {vendors.map(v => {
          return <>{v._rawData.join(",")}</>;
        })}
      </div>
    </>
  );
};

export default VendorsList;
