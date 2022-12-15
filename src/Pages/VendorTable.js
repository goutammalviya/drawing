import React, { useEffect, useMemo, useState } from "react";
import BasicTable from "./../Components/Table/CommonTable";
import { VendorsColumns } from "../Components/Table/TableColumns";
import { useNavigate } from "react-router-dom";

import useSheetService from "../Services/useSheetService";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFolderView,
} from "react-icons/ai";
import Swal from "sweetalert2";
import Loader from "../Components/loader/Loader";
import ModalForm from "./ModalForm";
import ModalTrans from "./ModalTrans";
import { ColumnFilter } from "./ColumnFilter";
const VendorTable = () => {
  const { getSheetRows, sheet } = useSheetService(
    "1MlxW96U5AFXWomLRBRug8eCEJCohXKR267KwNydyWrw",
    "Refrence"
  );
  const { getSheetRows:masterGetSheetRows, sheet:masterSheet } = useSheetService(
    "1MlxW96U5AFXWomLRBRug8eCEJCohXKR267KwNydyWrw",
    "Master"
  );

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [renderModal2, setRenderModal2] = useState(false);
  const [projects, setProjects] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [sheetsData, setSheetData] = useState([]);
  const [row, setRow] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    reFetchData(true);
  }, []);

  const reFetchData = async showLoader => {
    showLoader ? setLoading(true) : setLoading2(true);
    const sheetData = await getSheetRows(sheet);
    console.log(sheetData);
    setSheetData(sheetData);
    setProjects(sheetData.filter(d => d["Project Name"]));
    showLoader ? setLoading(false) : setLoading2(false);
    const masterSheetData = await masterGetSheetRows(masterSheet);
    setMasterData(masterSheetData);
  };

  const deleteRow = async row => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        await row.delete();
        await reFetchData(false);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const columns = useMemo(() => [
    {
      Header: "Project",
      accessor: "Project Name",
      Filter: ColumnFilter,
    },
    {
      Header: "Drawings",
      accessor: "Drawings",
      Filter: "",
      Cell: ({ row: { original } }) => {
        return (
          <span className="d-flex px-1">
            <div className=" bg-light-green d-flex p-2 cursor-pointer">
              <div
                onClick={() => {
                  setRow(original);
                  setRenderModal(true);
                  setTimeout(() => {
                    document.getElementById("modal-btn-click").click();
                  }, 100);
                }}>
                Upload drawing
                <AiOutlineEdit />
              </div>
              <button
                type="button"
                data-bs-toggle="modal"
                style={{ display: "none" }}
                data-bs-target="#rowmodal"
                id="modal-btn-click">
                Upload drawing
              </button>
            </div>
          </span>
        );
      },
    },
    {
      Header: "Transmittled",
      accessor: "transmittled",
      Filter: "",
      Cell: ({ row: { original } }) => {
        return (
          <span className="d-flex px-1">
            <div className=" bg-light-green d-flex p-2 cursor-pointer">
              <div
                onClick={() => {
                  setRow(original);
                  setRenderModal2(true);
                  setTimeout(() => {
                    document.getElementById("modal-trans-btn-click").click();
                  }, 100);
                }}>
                Get Transmittals
                <AiOutlineEdit />
              </div>
              <button
                type="button"
                data-bs-toggle="modal"
                style={{ display: "none" }}
                data-bs-target="#tansmodal"
                id="modal-trans-btn-click">
                Get Transmittals
              </button>
            </div>
          </span>
        );
      },
    },
  ]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className="main-page">
      {loading2 && <Loader />}

      <div className="text-center">
        <div className="h2 pt-3 fc-white fw-semibold">Project List</div>
      </div>

      <div
        style={{ background: "#1a1c28" }}
        className="card border-0 p-2 m-2 m-md-4 box-shadow">
        {renderModal && (
          <ModalForm
            setRenderModal={setRenderModal}
            sheetsData={sheetsData}
            reFetchData={reFetchData}
            data={row}
            modalId={`rowmodal`}
          />
        )}
        {renderModal2 && (
          <ModalTrans
            setRenderModal={setRenderModal2}
            sheetsData={sheetsData}
            masterData={masterData}
            reFetchData={reFetchData}
            data={row}
            modalId={`tansmodal`}
          />
        )}
        <BasicTable
          headingCenter={[]}
          itemsCenter={[]}
          data={projects}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default VendorTable;
