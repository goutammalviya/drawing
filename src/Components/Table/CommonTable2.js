import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRowSelect, useTable  , useFilters} from 'react-table';
import Checkbox from './Checkbox';
import { CSVLink } from "react-csv";

//importing custum components
import './Table.css'
//importing custum components

import { ColumnFilter } from '../../Pages/ColumnFilter';
import logo from "../../logo.png";
import { jsPDF } from "jspdf";

const BasicTable = ({
  data,
  projects,
  columns,
  headingCenter,
  itemsCenter,
  showExport,
  showCheckBox,
  ...props
}) => {

  const [pdfData, setPdfData] = useState([]);
  const pdfRef = useRef(null);
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )

showCheckBox = showCheckBox;
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useFilters,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        if(!showCheckBox) return columns;
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
          },
          ...columns
        ];
      });
    }
  );
  // eslint-disable-next-line
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;

  var exportCsv = [];
  useEffect(() => {
    let sum  = 0;
     selectedFlatRows.forEach((row) => {
        let data = Object.assign({}, row.original);
        delete data._sheet;
        delete data._rowNumber;
        delete data._rawData;
        delete data.id;
        sum += parseInt(data['No Of Sets']);
        exportCsv.push(data);
      })
    if (setPdfData !== undefined && setPdfData !== null && exportCsv.length > 0) {
      exportCsv[0]['sum'] = sum;
      setPdfData(exportCsv);
    }

  }, [selectedFlatRows]);
  // eslint-disable-next-line
  const checkboxData = JSON.stringify(
    {
        selectedFlatRows: selectedFlatRows.forEach((row) => {
            let data = Object.assign({}, row.original);
            delete data._sheet;
            delete data._rowNumber;
            delete data._rawData;
            delete data.id;
            // exportCsv.push(data)
        })
    },
    null,
    2
);
// console.log(checkboxData)
function generatePDF() {
  const content = pdfRef.current;
  const doc = new jsPDF();
  doc.html(content, {
    callback: function (doc) {
      doc.save(projects[0]["Project Name"] + ".pdf");
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
    <>
      <div className='table-responsive  p-0 p-sm-2 mt-1'>
        <div></div>
        {showExport&&
        <button className='btn btn-success my-2'> <CSVLink className="dropdown-item" style={{ fontWeight: 'bold' }} data={exportCsv}>Export</CSVLink>  </button>
        }
        
        <button className="btn btn-primary my-2" onClick={generatePDF}>
            Download PDF
          </button>
        <table {...getTableProps()} className='myTable table'>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <>
                  <tr style={{borderRadius: "10px !important"}} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <>
                        {headingCenter.includes(column.Header) ? (
                          <th  style={{borderRadius: "10px !important" , color: "blue"}} className=' text-center table-heading fs-5' {...column.getHeaderProps()}>
                           
                         
                            {(column.id !== "selection") ?
                              column.render('Header') :
                              <span className="p-5">
                                {column.render('Header')}
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                {/* <img src={sort} className="ml-2" alt="^" /> */}
                              </span>
                            }
                          </th>
                        ) : (
                          <th  style={{borderRadius: "10px !important", color: "blue"}} className='table-heading fs-5' {...column.getHeaderProps()}>
                            {(column.id !== "selection") ?
                              (
                                <>
                                  {column.render('Header')}
                                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                                  {/* <img src={sort} className="ml-2" alt="^" /> */}
                                </>
                              )
                              :
                              column.render('Header')
                            }
                          </th>
                        )}
                      </>
                    ))}
                  </tr>
                </>
              );
            })}
          </thead>
          <tbody style={{background: "white"}} {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr style={{borderRadius: "0px"}} {...row.getRowProps()} className='table_data_common'>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        {itemsCenter.includes(cell.column.Header) ? (
                          <td {...cell.getCellProps()} className='text-center table-data-row middle'>
                            {cell.render('Cell')}
                          </td>
                        ) : (
                          <td {...cell.getCellProps()} className='fs-12 table-data-row middle'>
                            {cell.render('Cell')}
                          </td>
                        )}
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        { (
          <div
            style={{
              display: "none",
              justifyContent: "center",
              background: "white",
            }}>
            <div>
              <div
                ref={pdfRef}
                className="d-flex justify-content-center"
                style={{
                  padding: "50px",
                  color: "black",
                  background: "white",
                  fontWeight: "bold",
                  width: "1000px",
                }}>
                <table class="table table-striped table-bordered pdf_table">
                  <tr className="xyz">
                    <td colspan="2" className="abc">
                      <img src={logo} />
                    </td>

                    <td colspan="6" className="abc2">
                      RAJIV ASSOCIATES
                      <br />
                      TRANSMITTAL
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;Project</td>
                    <td colspan="2">&nbsp;{projects[0]["Project Name"]}</td>

                    <td colspan="2"> &nbsp;Date</td>
                    <td colspan="2">&nbsp;{projects[0]["Date"]}</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Issued To</td>
                    <td colspan="2"></td>

                    <td colspan="2">&nbsp;Ref. No.</td>
                    <td colspan="2"></td>
                  </tr>

                  <tr
                    className="pdfDataRow"
                    style={{ backgroundColor: "rgb(192 192 192)" }}>
                    <td>Drg. No.</td>
                    <td>Description</td>
                    <td>No. Of Shets</td>
                    <td>Revision</td>
                    <td>Mail/Print/ReIssue</td>
                    <td>Print Size</td>
                    <td>Execution</td>
                  </tr>
                  {pdfData &&
                    pdfData.map((item, index) => {
                      return (
                        <tr className="pdfDataRow">
                          <td>{item["Drawing No"]}</td>
                          <td>{item["Drawing Name"]}</td>
                          <td>{item["No Of Sets"]}</td>
                          <td>{item["Revision No"]}</td>
                          <td>{item["Mail/Print/ReIssue"]}</td>
                          <td>{item["Size"]}</td>
                          <td>{item["Execution"]}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td>&nbsp;Total no. of Sheets Issued</td>
                    <td></td>
                    <td style={{ textAlign: "center" }}>{pdfData[0]?.sum}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>&nbsp;Remarks</td>
                    <td colspan="6"></td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "rgb(192 192 192)",
                        textAlign: "center",
                      }}
                      colspan="12">
                      202 Sartaj ML-Apartment, E-38 Ring Road, Rajouri Garden,
                      New Delhi- 110027
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default BasicTable;
