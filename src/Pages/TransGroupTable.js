import React, { useEffect, useMemo, useState, useRef } from "react";
import BasicTable from "../Components/Table/CommonTable2";

import { AiFillEye } from "react-icons/ai";

import { ColumnFilter } from "./ColumnFilter";
const VendorTable = ({ data }) => {
  const [projects, setProjects] = useState([]);
 
  useEffect(() => {
    setProjects(data);
  }, [data]);
  //  Drawing No	Date	Drawing Name	Drawing Url	No Of Sets	Revision No	Size	Execution	Mail/Print/ReIssue
  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "Date",
      Filter: ColumnFilter,
    },
    {
      Header: "Drawing No",
      accessor: "Drawing No",
      Filter: ColumnFilter,
    },
    {
      Header: "Drawing Name",
      accessor: "Drawing Name",
      Filter: ColumnFilter,
    },
    {
      Header: "No Of Sets",
      accessor: "No Of Sets",
      Filter: ColumnFilter,
    },
    {
      Header: "Revision No",
      accessor: "Revision No",
      Filter: ColumnFilter,
    },
    {
      Header: "Size",
      accessor: "Size",
      Filter: ColumnFilter,
    },
    {
      Header: "Execution",
      accessor: "Execution",
      Filter: ColumnFilter,
    },
    {
      Header: "Mail/Print/ReIssue",
      accessor: "Mail/Print/ReIssue",
      Filter: ColumnFilter,
    },
    {
      Header: "Drawing Url",
      accessor: "Drawing Url",
      Filter: ColumnFilter,
      Cell: ({ row: { original } }) => {
        return (
          <span
            onClick={() => {
              window.open(original["Drawing Url"], "_blank");
            }}
            className="d-flex justify-content-center px-1">
            <div className=" bg-light-green d-flex p-2 cursor-pointer">
              <div>
                <AiFillEye />
                {original["Drawing Url"]}
              </div>
            </div>
          </span>
        );
      },
    },
  ]);


  return (
    projects.length > 0 && (
      <div>
        <div
          style={{ background: "#1a1c28" }}
          className="card border-0 p-2 m-2 m-md-4 box-shadow">
          <BasicTable
            headingCenter={["Date", "Transmittled"]}
            itemsCenter={["Date", "Transmittled"]}
            data={projects}
            columns={columns}
            showCheckBox={true}
            projects={projects}
          />
        </div>
       
      </div>
    )
  );
};

export default VendorTable;
