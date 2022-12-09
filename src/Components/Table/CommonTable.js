import React from 'react';
import { useRowSelect, useTable  , useFilters} from 'react-table';
import Checkbox from './Checkbox';
import { CSVLink } from "react-csv";

//importing custum components
import './Table.css'
//importing custum components
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ColumnFilter } from '../../Pages/ColumnFilter';

const BasicTable = ({
  data,
  columns,
  headingCenter,
  itemsCenter,
  showExport,
  showCheckBox,
  ...props
}) => {


  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )

// showCheckBox = true;
  const dispatch = useDispatch()
  let location = useLocation();
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
  // eslint-disable-next-line
  const checkboxData = JSON.stringify(
    {
        selectedFlatRows: selectedFlatRows.forEach((row) => {
            let data = Object.assign({}, row.original);
            console.log(data);
            delete data._sheet;
            delete data._rowNumber;
            delete data._rawData;
            delete data.id;
            exportCsv.push(data)
        })
    },
    null,
    2
);
console.log(checkboxData)

  return (
    <>
      <div className='table-responsive  p-0 p-sm-2 mt-1'>
        <div></div>
        {showExport&&
        <button className='btn btn-success my-2'> <CSVLink className="dropdown-item" style={{ fontWeight: 'bold' }} data={exportCsv}>Export</CSVLink>  </button>
        }
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
    
      </div>
    </>
  )
}

export default BasicTable;
