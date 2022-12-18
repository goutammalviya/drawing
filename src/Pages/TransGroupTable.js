import React, { useEffect, useMemo, useState ,useRef} from "react";
import BasicTable from "../Components/Table/CommonTable";

import { AiFillEye } from "react-icons/ai";
import logo from "../logo.png";
import { jsPDF } from 'jspdf';
import { ColumnFilter } from './ColumnFilter';
const VendorTable = ({ data }) => {
  const [projects, setProjects] = useState([]);
  const [pdfData , setPdfData] = useState("");
  console.log('[ pdfData ] >', pdfData)
  const pdfRef = useRef(null);
  useEffect(() => {
    setProjects(data);
  }, [data]);
  //  Drawing No	Date	Drawing Name	Drawing Url	No Of Sets	Revision No	Size	Execution	Mail/Print/ReIssue
  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "Date",
      Filter: ColumnFilter
    },
    {
      Header: "Drawing No",
      accessor: "Drawing No",
      Filter: ColumnFilter
    },
    {
      Header: "Drawing Name",
      accessor: "Drawing Name",
      Filter: ColumnFilter
    },
    {
      Header: "No Of Sets",
      accessor: "No Of Sets",
      Filter: ColumnFilter
    },
    {
      Header: "Revision No",
      accessor: "Revision No",
      Filter: ColumnFilter
    },
    {
      Header: "Size",
      accessor: "Size",
      Filter: ColumnFilter
    },
    {
      Header: "Execution",
      accessor: "Execution",
      Filter: ColumnFilter
    },
    {
      Header: "Mail/Print/ReIssue",
      accessor: "Mail/Print/ReIssue",
      Filter: ColumnFilter
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
 

  function generatePDF() {
    const content = pdfRef.current;
    const doc = new jsPDF();
    doc.html(content, {
        callback: function (doc) {
            doc.save(projects[0]["Project Name"]+".pdf");
            // doc.output("dataurlnewwindow");
        },
        html2canvas: {
            // scale: 0.131,
            scale: 0.21,
            jspdf: {
                unit: "in",
                format: "a4",
                orientation: "portrait",
            },
        },
    });
}
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
          showCheckBox={true}
          setPdfData={setPdfData}
        />
      </div> 
      <button className="btn btn-primary" onClick={generatePDF}>Download PDF</button>
      
      <div style={{display:"none",justifyContent:'center',background:"white"}}>
      <div>
      <div ref={pdfRef} className='d-flex justify-content-center' style={{padding:'50px',color: "black" , background: "white",fontWeight:"bold",width:"1000px"}}>
      <table  class="table table-striped table-bordered pdf_table"  >
        <tr className="xyz">
          <td colspan='2' className="abc" ><img src={logo}/></td>
        
          <td colspan="6" className="abc2" >
            RAJIV ASSOCIATES
            <br />
            TRANSMITTAL
          </td>
     
        </tr>
        <tr>
          <td>Project</td>
          <td colspan="2"> {projects[0]["Project Name"]}</td>
          
          <td colspan="2">Date</td>
          <td colspan="2">{projects[0]['Date']}</td>
          
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
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2"></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="pdfDataRow" style={{backgroundColor:"rgb(192 192 192)"}}>
          <td>Drg. No.</td>
          <td>Description</td>
          <td>No. Of Sheets</td>
          <td>Revision</td>
          <td>Mail/Print/ReIssue</td>
          <td>Print Size</td>
          <td>Execution</td>
        </tr>
        {
          projects && projects.map((item , index)=>{
            return (
              <tr className="pdfDataRow" >
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
          <td style={{backgroundColor:"rgb(192 192 192)", textAlign:"center"}} colspan="12">
            202 Sartaj ML-Apartment, E-38 Ring Road, Rajouri Garden, New Delhi-
            110027
          </td>
       
        </tr>
      </table>
      </div>
      </div>
      </div>
    </div>
    )
  );
};

export default VendorTable;
