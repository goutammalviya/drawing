import React, { useState } from "react";
// import imageCompression from "browser-image-compression";
import useSheetService from "../Services/useSheetService";
// import modal_cross from '../../../assets/Images/modal-cross.svg';
// import { Oval } from 'react-loader-spinner';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik
} from "formik";
import * as Yup from "yup";
import TextError from "../Components/Formik/TextError";
import useDriveService from "../Services/driveService";
import "./Modal.css";

import Swal from "sweetalert2";
import { AdjLoader } from "../Components/loader/Loader";

const ModalForm = props => {
  const { modalId, data, setRenderModal, sheetsData, reFetchData } = props;
  const [file, setFiles] = useState("");
  const [loading, setLoading] = useState(false);
  const { UploadFiles } = useDriveService();
  const { addRow, sheet } = useSheetService(
    "1MlxW96U5AFXWomLRBRug8eCEJCohXKR267KwNydyWrw",
    "Master"
  );
  // const inputRef = React.createRef()
  // const { setFieldValue } = useFormik();
  const initialValues = {
    project: data["Project Name"],
    drawings: [
      {
        drawingNo: "",
        name: "",
        file: "",
        noOfSets: "",
        size: "",
        execution: "",
        revisionNo: "",
        MailPrintReIssue: "",
      },
    ],
  };
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    let drawings = values.drawings;
    for (const element of drawings) {
      console.log("/////////////====================");
      const fileRes = await UploadFiles(
        [element.file],
        "1q6eJgb_oUIQokciLMH8Hp1YDYuP8eA_m"
      );
      let data = {
        "Project Name": values.project,
        Date: new Date().toJSON().split("T")[0],
        "Drawing Name": element.name,
        "Drawing No": element.drawingNo,
        "No Of Sets": element.noOfSets,
        Size: element.size,
        Execution: element.execution,
        "Revision No": element.revisionNo,
        "Mail/Print/ReIssue": element.MailPrintReIssue,
        "Drawing Url": fileRes[0].url,
      };
      await addRow(sheet, data);
    }
    resetForm();
    document.getElementById("closeModal").click();
    setRenderModal(false);
    Swal.fire("Success!", "Drawings Added Successfully!", "success");
    setLoading(false);
  };
  const validationSchema = Yup.object({
    drawings: Yup.array()
      .of(
        Yup.object({
          drawingNo: Yup.string().required("Required"),
          name: Yup.string().required("Required"),
          file: Yup.string().required("Required"),
          noOfSets: Yup.string().required("Required"),
          size: Yup.string().required("Required"),
          execution: Yup.string().required("Required"),
          revisionNo: Yup.string().required("Required"),
          MailPrintReIssue: Yup.string().required("Required"),
        })
      )
      .required("Must have friends"),
  });
  const getImage = (event, setFieldValue, index) => {
    let files = event.target.files;
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (e) => {
    //   console.log("image data: ", e.target.result);
    //   setFiles(e.target.result);
    setFieldValue(`drawings.${index}.file`, files[0]);
    // };
  };
  return (
    <>
      <div
        style={{ zIndex: 5000 }}
        class="modal fade"
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="2"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div
          class="modal-dialog"
          style={{ maxWidth: "inherit", margin: "50px" }}>
          <div class="modal-content bgg-primary">
            <div class="modal-header">
              <h5 class="modal-title fc-white" id="staticBackdropLabel">
                Upload Drawings - {data["Project Name"]}
              </h5>
              <button
                type="button"
                class="btn-close"
                style={{ backgroundColor: "white" }}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setRenderModal(false)}></button>
            </div>
            <div class="modal-body">
              {loading && <AdjLoader />}
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                className="contact-form">
                {({ values }) => (
                  <Form autoComplete="off">
                    <div className="row p-1">
                      <div className="col-12 col-md-6">
                        <div className="row"></div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="row">
                          <div className="col-12"></div>
                        </div>
                      </div>
                      <div className="col-12 py-2">
                        <FieldArray name="drawings">
                          {({ insert, remove, push }) => (
                            <div>
                              {values.drawings.length > 0 &&
                                values.drawings.map((friend, index) => (
                                  <div className="row" key={index}>
                                        <div className="py-2 col">
                                      <label
                                        htmlFor={`drawings.${index}.drawingNo`}
                                        className="fs10 fc-white ff-montserrat">
                                        Drawing No.
                                      </label>
                                      <Field
                                        name={`drawings.${index}.drawingNo`}
                                        placeholder="Enter Drawing No."
                                        type="text"
                                        className="form-control br-none br-6 border-bottom"
                                      />
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.drawingNo`}
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor=" required"
                                        className="fs10 fc-white ff-montserrat">
                                        Select Rev. Number
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Revision Number"
                                        name={`drawings.${index}.revisionNo`}>
                                        {" "}
                                        <option value="">
                                          Select Revision Number
                                        </option>
                                        {sheetsData
                                          ?.filter(
                                            item => item["Revision Number"]
                                          )
                                          .map(item => {
                                            return (
                                              <option
                                                value={item["Revision Number"]}>
                                                {item["Revision Number"]}
                                              </option>
                                            );
                                          })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.revisionNo`}
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor=" required"
                                        className="fs10 fc-white ff-montserrat">
                                        Select Drawing ({index + 1})
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Drawing Name"
                                        name={`drawings.${index}.name`}>
                                        {" "}
                                        <option value="">
                                          Select Drawing Name
                                        </option>
                                        {sheetsData?.map(item => {
                                          let headingFlag =
                                            item["Drawing Name"]?.includes("*");

                                          return (
                                            <option
                                              disabled={headingFlag}
                                              style={
                                                headingFlag
                                                  ? { fontWeight: "bold" }
                                                  : {}
                                              }
                                              value={item["Drawing Name"]}>
                                              {item["Drawing Name"]}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.name`}
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor=" required"
                                        className="fs10 fc-white ff-montserrat">
                                        Select Drawing Size
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Drawing Size"
                                        name={`drawings.${index}.size`}>
                                        {" "}
                                        <option value="">
                                          Select Drawing Size
                                        </option>
                                        {sheetsData
                                          ?.filter(item => item["Size"])
                                          .map(item => {
                                            return (
                                              <option value={item["Size"]}>
                                                {item["Size"]}
                                              </option>
                                            );
                                          })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.size`}
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor={`drawings.${index}.noOfSets`}
                                        className="fs10 fc-white ff-montserrat">
                                        No. Of Sets
                                      </label>
                                      <Field
                                        name={`drawings.${index}.noOfSets`}
                                        placeholder="Enter No. Of Sets"
                                        type="text"
                                        className="form-control br-none br-6 border-bottom"
                                      />
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.noOfSets`}
                                      />
                                    </div>

                                    <div className="py-2 col">
                                      <label
                                        htmlFor=" required"
                                        className="fs10 fc-white ff-montserrat">
                                        Select Execution
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Drawing Execution"
                                        name={`drawings.${index}.execution`}>
                                        {" "}
                                        <option value="">
                                          Select Execution
                                        </option>
                                        {sheetsData
                                          ?.filter(item => item["Execution"])
                                          .map(item => {
                                            return (
                                              <option value={item["Execution"]}>
                                                {item["Execution"]}
                                              </option>
                                            );
                                          })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.execution`}
                                      />
                                    </div>

                                    <div className="py-2 col">
                                      <label
                                        htmlFor={`drawings.${index}.file`}
                                        className="fs10 fc-white ff-montserrat">
                                        Upload drawing
                                      </label>
                                      {/* <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        type="file"
                                        placeholder="upload"
                                        // onChange={event => {
                                        //   setFieldValue(
                                        //     `drawings.${index}.file`,
                                        //     event.currentTarget.files[0]
                                        //   );
                                        // }}
                                        onChange={(event) => getImage(event)}
                                        name={`drawings.${index}.file`}
                                      /> */}
                                      <Field name={`drawings.${index}.file`}>
                                        {({ form, field }) => {
                                          const { setFieldValue } = form;
                                          return (
                                            <input
                                              type="file"
                                              className="form-control br-none br-6 border-bottom"
                                              onChange={e =>
                                                getImage(
                                                  e,
                                                  setFieldValue,
                                                  index
                                                )
                                              }
                                            />
                                          );
                                        }}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.file`}
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor=" required"
                                        className="fs10 fc-white ff-montserrat">
                                        Select Mail/Print...
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom dropdown"
                                        id=""
                                        as="select"
                                        placeholder="select Mail/Print/Re-issue"
                                        name={`drawings.${index}.MailPrintReIssue`}>
                                        {" "}
                                        <option value="">Select </option>
                                        {sheetsData
                                          ?.filter(item => item["Status"])
                                          .map(item => {
                                            return (
                                              <option value={item["Status"]}>
                                                {item["Status"]}
                                              </option>
                                            );
                                          })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.MailPrintReIssue`}
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <button
                                        type="button"
                                        style={{ marginTop: "30px" }}
                                        className={`${
                                          index > 0
                                            ? "btn btn-primary"
                                            : "d-none"
                                        }`}
                                        onClick={() => remove(index)}>
                                        {index > 0 && "remove"}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              <button
                                type="button"
                                className="btn btn-primary mt-2"
                                onClick={() =>
                                  push({
                                    drawingNo: "",
                                    name: "",
                                    file: "",
                                    noOfSets: "",
                                    size: "",
                                    execution: "",
                                    revisionNo: "",
                                    MailPrintReIssue: "",
                                  })
                                }>
                                Add More
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>

                    <div className="button text-center py-3 mt-3">
                      <div class="modal-footer d-flex justify-content-around">
                        <button
                          type="button"
                          id="closeModal"
                          class="btn btn-lg btn-danger d-none fw-normal ff-montserrat px-5 py-2"
                          data-bs-dismiss="modal">
                          Close
                        </button>

                        <button
                          type="submit"
                          className="btn btn-lg btn-primary fw-normal ff-montserrat px-5 py-2">
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
