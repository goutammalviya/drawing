import React, { useEffect, useMemo, useState } from "react";
import BasicTable from "../Components/Table/CommonTable";

import {
  AiFillEye
} from "react-icons/ai";

const VendorTable = ({data,setDate}) => {
  const [projects, setProjects] = useState([]);
 useEffect(() => {setProjects(data)}, [data]);
  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "Date",
      Filter: "",
    },
    {
      Header: "Transmittled",
      accessor: "Transmittled",
      Filter: "",
      Cell: ({ row: { original } }) => {
        return (
          <span className="d-flex justify-content-center px-1">
            <div className=" bg-light-green d-flex p-2 cursor-pointer">
            <div
                onClick={() => {
                  setDate(original['Date']);
                }}>
                 {original['Drawing No']}
                <AiFillEye />
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
