import React, { useEffect, useRef, useState } from "react";
import imageCompression from 'browser-image-compression';
import useSheetService from "../Services/useSheetService";
// import modal_cross from '../../../assets/Images/modal-cross.svg';
// import { Oval } from 'react-loader-spinner';
import "./Modal.css";
import * as Yup from "yup";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik
} from "formik";
import TextError from "../Components/Formik/TextError";

const ModalForm = (props) => {
  const { modalId, data, setRenderModal, sheetsData, reFetchData } = props;
  const [file, setFiles] = useState("");
  // const inputRef = React.createRef()
  // const { setFieldValue } = useFormik();
  const initialValues = {
    project: data["Project Name"],
    MailPrintReIssue: "",
    teamLead: "",
    teamMember: "",
    date: "",
    drawings: [
      {
        name: "",
        file: "",
        noOfSets: "",
        size: "",
        execution: "",
        revisionNo: ""
      }
    ]
  };
  const handleSubmit = async (values) => {
    console.log(values);

    // setRenderModal(false);
  };
  const validationSchema = Yup.object({
    // email: Yup.string().required("Required*"),
    // companyName: Yup.string().required("Required*"),
    // location: Yup.string().required("Required*"),
    // address: Yup.string().required("Required*"),
    // contactPersonName: Yup.string().required("Required*"),
    // contactNumber: Yup.string().required("Required*"),
    // vendorListCategory: Yup.string().required("Required*"),
    // websiteUrl: Yup.string().required("Required*"),
    // linkdinUrl: Yup.string().required("Required*"),
    // checkBox: Yup.boolean()
  });
  const getImage = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log('image data: ', e.target.result);
      setFiles(e.target.result);
    }; 
  
  };
  console.log(file);
  return (
    <>
      <div
        style={{ zIndex: 5000 }}
        class="modal fade"
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="2"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          style={{ maxWidth: "inherit", margin: "50px" }}
        >
          <div class="modal-content bgg-primary">
            <div class="modal-header">
              <h5 class="modal-title fc-white" id="staticBackdropLabel">
                Update Drawing
              </h5>
              <button
                type="button"
                class="btn-close"
                style={{ backgroundColor: "white" }}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setRenderModal(false)}
              ></button>
            </div>
            <div class="modal-body">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                className="contact-form"
              >
                {({ values }) => (
                  <Form autoComplete="off">
                    <div className="row p-1">
                      <div className="col-12 col-md-6">
                        <div className="row">
                          <div className="col-12">
                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Project Name
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                placeholder="Project Name"
                                name="project"
                              />
                              <ErrorMessage
                                component={TextError}
                                name="project"
                              />
                            </div>

                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Date
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                type="date"
                                name="date"
                              />
                              <ErrorMessage component={TextError} name="date" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="row">
                          <div className="col-12">
                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Select Mail/Print/Re-issue
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                as="select"
                                placeholder="select Mail/Print/Re-issue"
                                name="MailPrintReIssue"
                              >
                                {" "}
                                <option value="">Select </option>
                                {sheetsData
                                  ?.filter((item) => item["Status"])
                                  .map((item) => {
                                    return (
                                      <option value={item["Status"]}>
                                        {item["Status"]}
                                      </option>
                                    );
                                  })}
                              </Field>
                              <ErrorMessage
                                component={TextError}
                                name="Mail/Print/Re-issue"
                              />
                            </div>
                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Select Team Lead
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                as="select"
                                placeholder="select Team Lead"
                                name="teamLead"
                              >
                                {" "}
                                <option value="">Select Team Lead</option>
                                {sheetsData
                                  ?.filter((item) => item["Team Lead"])
                                  .map((item) => {
                                    return (
                                      <option value={item["Team Lead"]}>
                                        {item["Team Lead"]}
                                      </option>
                                    );
                                  })}
                              </Field>
                              <ErrorMessage
                                component={TextError}
                                name="teamLead"
                              />
                            </div>
                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Select Team Member
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                as="select"
                                placeholder="select Team Member"
                                name="teamMember"
                              >
                                {" "}
                                <option value="">Select Team Member</option>
                                {sheetsData
                                  ?.filter((item) => item["Team Member"])
                                  .map((item) => {
                                    return (
                                      <option value={item["Team Member"]}>
                                        {item["Team Member"]}
                                      </option>
                                    );
                                  })}
                              </Field>
                              <ErrorMessage
                                component={TextError}
                                name="teamMember"
                              />
                            </div>
                          </div>
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
                                        htmlFor=" required"
                                        className="fs-5 fc-white ff-montserrat"
                                      >
                                        Select Rev. Number
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Revision Number"
                                        name={`drawings.${index}.revisionNo`}
                                      >
                                        {" "}
                                        <option value="">
                                          Select Revision Number
                                        </option>
                                        {sheetsData
                                          ?.filter(
                                            (item) => item["Revision Number"]
                                          )
                                          .map((item) => {
                                            return (
                                              <option
                                                value={item["Revision Number"]}
                                              >
                                                {item["Revision Number"]}
                                              </option>
                                            );
                                          })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name="revisionNo"
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor=" required"
                                        className="fs-5 fc-white ff-montserrat"
                                      >
                                        Select Drawing ({index + 1})
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Drawing Name"
                                        name={`drawings.${index}.name`}
                                      >
                                        {" "}
                                        <option value="">
                                          Select Drawing Name
                                        </option>
                                        {sheetsData?.map((item) => {
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
                                              value={item["Drawing Name"]}
                                            >
                                              {item["Drawing Name"]}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name="drawingName"
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor=" required"
                                        className="fs-5 fc-white ff-montserrat"
                                      >
                                        Select Drawing Size
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Drawing Size"
                                        name={`drawings.${index}.size`}
                                      >
                                        {" "}
                                        <option value="">
                                          Select Drawing Size
                                        </option>
                                        {sheetsData
                                          ?.filter((item) => item["Size"])
                                          .map((item) => {
                                            return (
                                              <option value={item["Size"]}>
                                                {item["Size"]}
                                              </option>
                                            );
                                          })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name="drawingName"
                                      />
                                    </div>
                                    <div className="py-2 col">
                                      <label
                                        htmlFor={`drawings.${index}.noOfSets`}
                                        className="fs-5 fc-white ff-montserrat"
                                      >
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
                                        className="fs-5 fc-white ff-montserrat"
                                      >
                                        Select Execution
                                      </label>
                                      <Field
                                        className="form-control br-none br-6 border-bottom"
                                        id=""
                                        as="select"
                                        placeholder="select Drawing Execution"
                                        name={`drawings.${index}.execution`}
                                      >
                                        {" "}
                                        <option value="">
                                          Select Execution
                                        </option>
                                        {sheetsData
                                          ?.filter((item) => item["Execution"])
                                          .map((item) => {
                                            return (
                                              <option value={item["Execution"]}>
                                                {item["Execution"]}
                                              </option>
                                            );
                                          })}
                                      </Field>
                                      <ErrorMessage
                                        component={TextError}
                                        name="Execution"
                                      />
                                    </div>

                                    <div className="py-2 col">
                                      <label
                                        htmlFor={`drawings.${index}.file`}
                                        className="fs-5 fc-white ff-montserrat"
                                      >
                                        Upload drawing
                                      </label>
                                      <Field
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
                                      />
                                      <ErrorMessage
                                        component={TextError}
                                        name={`drawings.${index}.file`}
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
                                        onClick={() => remove(index)}
                                      >
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
                                    name: "",
                                    file: "",
                                    noOfSets: "",
                                    size: "",
                                    execution: ""
                                  })
                                }
                              >
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
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>

                        <button
                          type="submit"
                          className="btn btn-lg btn-primary fw-normal ff-montserrat px-5 py-2"
                        >
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
