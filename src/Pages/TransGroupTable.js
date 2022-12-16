import React, { useEffect, useMemo, useState ,useRef} from "react";
import BasicTable from "../Components/Table/CommonTable";

import { AiFillEye } from "react-icons/ai";

// import { jsPDF } from "jspdf";
const VendorTable = ({ data }) => {
  const [projects, setProjects] = useState([]);
  const pdfRef = useRef(null);
  useEffect(() => {
    setProjects(data);
  }, [data]);
  //  Drawing No	Date	Drawing Name	Drawing Url	No Of Sets	Revision No	Size	Execution	Mail/Print/ReIssue
  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "Date",
      Filter: ""
    },
    {
      Header: "Drawing No",
      accessor: "Drawing No",
      Filter: ""
    },
    {
      Header: "Drawing Name",
      accessor: "Drawing Name",
      Filter: ""
    },
    {
      Header: "No Of Sets",
      accessor: "No Of Sets",
      Filter: ""
    },
    {
      Header: "Revision No",
      accessor: "Revision No",
      Filter: ""
    },
    {
      Header: "Size",
      accessor: "Size",
      Filter: ""
    },
    {
      Header: "Execution",
      accessor: "Execution",
      Filter: ""
    },
    {
      Header: "Mail/Print/ReIssue",
      accessor: "Mail/Print/ReIssue",
      Filter: ""
    },
    {
      Header: "Drawing Url",
      accessor: "Drawing Url",
      Filter: "",
      Cell: ({ row: { original } }) => {
        return (
          <span
            onClick={() => {
              window.open(original["Drawing Url"], "_blank");
            }}
            className="d-flex justify-content-center px-1"
          >
            <div className=" bg-light-green d-flex p-2 cursor-pointer">
              <div>
                <AiFillEye />
                {original["Drawing Url"]}
              </div>
            </div>
          </span>
        );
      }
    }
  ]);
  console.log('[ projects ] >', projects)

//   function generatePDF() {
//     const content = pdfRef.current;
//     const doc = new jsPDF();
//     doc.html(content, {
//         callback: function (doc) {
//             doc.save("PlanSummary.pdf");
//         },
//         html2canvas: {
//             scale: 0.234,
//             jspdf: {
//                 unit: "in",
//                 format: "a4",
//                 orientation: "portrait",
//             },
//         },
//     });
// }
  return (
    projects.length > 0 && (
      <div>
      <div
        style={{ background: "#1a1c28" }}
        className="card border-0 p-2 m-2 m-md-4 box-shadow"
      >
        <BasicTable
          headingCenter={["Date", "Transmittled"]}
          itemsCenter={["Date", "Transmittled"]}
          data={projects}
          columns={columns}
        />
      </div>
      <table ref={pdfRef} style={{color: "black" , background: "white"}} class="table table-striped table-bordered pdf_table">
      <button onClick={generatePDF}>Download PDF</button>
        <tr>
          <td></td>
          <td></td>
          <td colspan="4">
            RAJIV ASSOCIATES
            <br />
            TRANSMITTAL
          </td>
          <td></td>
        </tr>
        <tr>
          <td>Project</td>
          <td> - {projects[0]["Project Name"]}</td>
          <td></td>
          <td colspan="2">Date</td>
          <td></td>
          <td>{projects[0]['Date']}</td>
        </tr>
        <tr>
          <td>Issued To</td>
          <td></td>
          <td></td>
          <td colspan="2">Ref. No.</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Dept.</td>
          <td></td>
          <td></td>
          <td colspan="2">Print /Mail</td>
          <td>Mail</td>
          <td></td>
        </tr>
        <tr>
          <td>Drg. No.</td>
          <td>Descrip on</td>
          <td>No. Of Sheets</td>
          <td>Revision</td>
          <td>Mail/Print/ReIssue</td>
          <td>Print Size</td>
          <td>Execu on</td>
        </tr>
        {
          projects && projects.map((item , index)=>{
            return (
              <tr>
              <td>{item['Drawing No']}</td>
              <td>{item['Drawing Name']}</td>
              <td>{item['No Of Sets']}</td>
              <td>{item['Revision No']}</td>
              <td>{item['Mail/Print/ReIssue']}</td>
              <td>{item['Size']}</td>
              <td>{item['Execution']}</td>
             
            </tr>
            )
          })
        }
        <tr>
          <td>Total no. of Sheets Issued</td>
          <td></td>
          <td></td>
          <td style={{ textAlign: "right" }}>0</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Remarks</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Sent Through</td>
          <td></td>
          <td></td>
          <td></td>
          <td>Mail/ By Hand</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>By Hand</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>By Email</td>
        </tr>
        <tr>
          <td colspan="2">Receiver's Signature with Stamp</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Sent By</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>ML-Ar. Ashish Rathee</td>
        </tr>
        <tr>
          <td colspan="6">
            202 Sartaj ML-Apartment, E-38 Ring Road, Rajouri Garden, New Delhi-
            110027
          </td>
          <td></td>
        </tr>
      </table>
    </div>
    )
  );
};

export default VendorTable;
