import React, { useEffect, useMemo, useState } from "react";
import BasicTable from "../Components/Table/CommonTable";

import {
  AiFillEye
} from "react-icons/ai";

const VendorTable = ({data}) => {


  const [projects, setProjects] = useState([]);

 
 useEffect(() => {setProjects(data)}, [data]);
//  Drawing No	Date	Drawing Name	Drawing Url	No Of Sets	Revision No	Size	Execution	Mail/Print/ReIssue
  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "Date",
      Filter: "",
    },
    {
      Header: "Drawing No",
      accessor: "Drawing No",
      Filter: "",
    },
    {
      Header: "Drawing Name",
      accessor: "Drawing Name",
      Filter: "",
    },
    {
      Header: "No Of Sets",
      accessor: "No Of Sets",
      Filter: "",
    },
    {
      Header: "Revision No",
      accessor: "Revision No",
      Filter: "",
    },
    {
      Header: "Size",
      accessor: "Size",
      Filter: "",
    },
    {
      Header: "Execution",
      accessor: "Execution",
      Filter: "",
    },
    {
      Header: "Mail/Print/ReIssue",
      accessor: "Mail/Print/ReIssue",
      Filter: "",
    },
    {
      Header: "Drawing Url",
      accessor: "Drawing Url",
      Filter: "",
      Cell: ({ row: { original } }) => {
        return (
          <span  onClick={() => {
            window.open(original['Drawing Url'], "_blank");
          }} className="d-flex justify-content-center px-1">
            <div className=" bg-light-green d-flex p-2 cursor-pointer">
            <div
               >
                <AiFillEye />
                 {original['Drawing Url']}
              </div>
              
              </div>
          </span>
        );
      },
    },
  ]);

  
  return (
    <div>
      <div
        style={{ background: "#1a1c28" }}
        className="card border-0 p-2 m-2 m-md-4 box-shadow">
        <BasicTable
          headingCenter={["Date", "Transmittled"]}
          itemsCenter={["Date", "Transmittled"]}
          data={projects}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default VendorTable;
