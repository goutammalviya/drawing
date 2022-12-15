import React, { useEffect, useRef, useState } from "react";
// import imageCompression from "browser-image-compression";
import useSheetService from "../Services/useSheetService";
// import modal_cross from '../../../assets/Images/modal-cross.svg';
// import { Oval } from 'react-loader-spinner';
import "./Modal.css";
import TransTable from './TransTable';
import TransGroupTable from './TransGroupTable';
import { AdjLoader } from "../Components/loader/Loader";
const ModalForm = props => {
  const { modalId, data, setRenderModal, masterData, sheetsData, reFetchData } =
    props;
  const [loading, setLoading] = useState(false);
  const [transmittals, setTransmittals] = useState([]);
  const [groupsTransmittals, setGroupsTransmittals] = useState({});
  const [date , setDate] = useState(null);
  useEffect(() => {
    let arr = [];
    let groups = {};
    masterData
      .filter(d => d["Project Name"] === data["Project Name"])
      .forEach((element,i) => {
        let date = element["Date"];
        if (!arr.some(e => e["Date"].includes(date))) {
          arr.push(element);
        }
        if (date in groups) {
          groups[date].push(element);
      } else {
          groups[date] = new Array(element);
      }

      });
    setTransmittals(arr);
    setGroupsTransmittals(groups);
  }, [masterData, sheetsData, data]);
useEffect(() => {console.log(transmittals); console.log(groupsTransmittals);}, [transmittals, groupsTransmittals]);
  return (
    <>
      <div
        style={{ zIndex: 5000 ,backgroundColor: 'rgb(26 28 40 / 60%)'}}
        class="modal fade"
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="3"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div
          class="modal-dialog"
          style={{ maxWidth: "inherit", margin: "50px" }}>
          <div class="modal-content bgg-primary">
            <div class="modal-header">
              <h5 class="modal-title fc-white" id="staticBackdropLabel">
                Transmittals - {data["Project Name"]}
              </h5>
              <button
                type="button"
                class="btn-close"
                style={{ backgroundColor: "white" }}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setRenderModal(false)}></button>
            </div>
            <div class="modal-body">{loading && <AdjLoader />
           
            } 
            {date !== null && <button className="btn btn-primary" onClick={() => setDate(null)}>Go Back</button>}
            {date !== null && <TransGroupTable data={groupsTransmittals[date]}/>}
            {date === null && <TransTable data={transmittals} setDate={setDate}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
