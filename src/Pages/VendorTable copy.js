import React, { useEffect, useMemo, useState } from "react";
import BasicTable from "./../Components/Table/CommonTable";
import { VendorsColumns } from "../Components/Table/TableColumns";
import { useNavigate } from "react-router-dom";
import sheetService, { getSheetRows } from "../Services/SheetService2";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFolderView
} from "react-icons/ai";
import Swal from "sweetalert2";
import Loader from "../Components/loader/Loader";
import { Modal } from "bootstrap";
import ModalForm from "./ModalForm";
import { ColumnFilter } from "./ColumnFilter";
const VendorTable = () => {



  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  let sheet = null;
  const [vendors, setVendors] = useState([]);
  const [row, setRow] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    reFetchData(true);
  }, []);

  const reFetchData = async (showLoader) => {
    showLoader ? setLoading(true) : setLoading2(true);
    const sheets = await sheetService("vendors");
    sheet = sheets;
    let data = await getSheetRows(sheet);
    setVendors(data);
    showLoader ? setLoading(false) : setLoading2(false);
  };

  const deleteRow = async (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await row.delete();
        await reFetchData(false);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const columns = useMemo(() => [
    {
      Header: "Action",
      accessor: "Action",
      Filter: "",
      Cell: ({ row: { original } }) => {
        return (
          <div className="d-flex">
            <span className="center-xy" onClick={() =>deleteRow(original)}>
              <div className="br-50 bg-light-red d-flex p-2 cursor-pointer">
                <AiOutlineDelete />
              </div>
            </span>
            {/* <span className="center-xy px-1">
              <div className="br-50 bg-light-green d-flex p-2 cursor-pointer">
                <AiOutlineEdit  onClick={()=>{ setRow(original); setRenderModal(true); setTimeout(() => {
                  document.getElementById('modal-btn-click').click();
                }, (100));}}
              />
                <button
                  type="button"
                  data-bs-toggle="modal"
                  style={{display: "none"}}
                  data-bs-target="#rowmodal"
                  id='modal-btn-click'
                   >
                </button>
              </div>
            </span> */}
            <span className="center-xy" >
              <div className="br-50 bg-light-green d-flex p-2 cursor-pointer">
                <AiOutlineFolderView />
              </div>
            </span>
          </div>
        );
      }
    },
    {
      Header: "Project",
      accessor: "project_name",
      Filter: ColumnFilter
    },
    {
      Header: "Drawings",
      accessor: "Drawings",
       Filter: ColumnFilter,
       Cell: ({row: { original }}) => {
      return (  <span className="d-flex px-1">
      <div className="br-50 bg-light-green d-flex p-2 cursor-pointer">
        <AiOutlineEdit  onClick={()=>{ setRow(original); setRenderModal(true); setTimeout(() => {
          document.getElementById('modal-btn-click').click();
        }, (100));}}
      />
        <button
          type="button"
          data-bs-toggle="modal"
          style={{display: "none"}}
          data-bs-target="#rowmodal"
          id='modal-btn-click'
           >
            Upload drawing
        </button>
      </div>
    </span>)
       }

    },
    {
      Header: "Transmittled",
      accessor: "transmittled",
       Filter: ColumnFilter

    },
    {
      Header: "dummy",
      accessor: "dummy",
       Filter: ColumnFilter

    },
 
    
   
  ]);

 const  data = [
    {
      project_name: "dummy",
      drawing: "dummy",
      transmittled: "dummy",
      dummy: "dummy"
    },
    {
      project_name: "dummy",
      drawing: "dummy",
      transmittled: "dummy",
      dummy: "dummy"
    },
    {
      project_name: "dummy",
      drawing: "dummy",
      transmittled: "dummy",
      dummy: "dummy"
    },
    {
      project_name: "dummy",
      drawing: "dummy",
      transmittled: "dummy",
      dummy: "dummy"
    },
    {
      project_name: "dummy",
      drawing: "dummy",
      transmittled: "dummy",
      dummy: "dummy"
    },
  ]

  

  console.log(vendors);
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div>
      {loading2 && <Loader />}

      <div className="text-center">
        <div className="h2 pt-3 fc-white fw-semibold">Drawing List</div>
      </div>

      <div style={{background:"#1a1c28"}} className="card border-0 p-2 m-2 m-md-4 box-shadow">

       {renderModal && <ModalForm setRenderModal={setRenderModal} reFetchData={reFetchData} data={row} modalId={`rowmodal`} /> }
        <BasicTable
          headingCenter={[]}
          itemsCenter={[]}
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default VendorTable;
