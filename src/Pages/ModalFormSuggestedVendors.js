import React, { useEffect, useState } from "react";
import "./Modal.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../Components/Formik/TextError";
import sheetService, { getSheetRows} from "../Services/SheetService2";
const ModalForm = props => {
  const { modalId, data, orgData, setRenderModal, reFetchData } = props;
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      const sheets = await sheetService("projects");
      const projectListres  = await getSheetRows(sheets);
      console.log(projectListres);
      setProjectList(projectListres);
    };
    asyncFn();
  }, []);
  const [projectCategoryList, setProjectCategoryList] = useState([]);
  useEffect(() => {
    const asyncFn = async () => {
      const sheets = await sheetService("projects");
      const projectCategoryListres  = await getSheetRows(sheets);
      console.log(projectCategoryListres);
      setProjectCategoryList(projectCategoryListres);
    };
    asyncFn();
  }, []);


  const initialValues = {
    email: data.email,
    companyName: data["company name"],
    location: data.location,
    address: data["address"],
    contactPersonName: data["contact person name"],
    contactNumber: data["contact no"],
    vendorListCategory: data["vendor list category"],
    websiteUrl: data["website url"],
    linkdinUrl: data["linkedIn url"],
    projectName: data["project name"],
    addAnotherProject: "",
    checkBox: data["suggested"] === "suggested" ? true : false,
  };
  const handleSubmit = async values => {
    // navigate("/vendors");

    console.log(data, "row");
    let orgRow = orgData.filter(
      r => r.suggested === "suggested" && r.id === data.id
    )[0];
    console.log(orgRow, "orgRow");
    orgRow.email = values.email;
    orgRow["company name"] = values.companyName;
    orgRow.location = values.location;
    orgRow["address"] = values.address;
    orgRow["contact person name"] = values.contactPersonName;
    orgRow["contact no"] = values.contactNumber;
    orgRow["vendor list category"] = values.vendorListCategory;
    orgRow["website url"] = values.websiteUrl;
    orgRow["linkedIn url"] = values.linkdinUrl;
    orgRow["project name"] = values.projectName;
    if (values.addAnotherProject !== "") {
      if(values.projectName)
      orgRow["project name"] = values.projectName + "," + values.addAnotherProject;
      else
      orgRow["project name"] = values.addAnotherProject;
    }
    if (values.checkBox === true) {
      orgRow["suggested"] = "suggested";
    } else {
      orgRow["suggested"] = "";
    }
    await orgRow.save();
    await reFetchData(false);
    document.getElementById("closeModal").click();
    setRenderModal(false);
  };
  const validationSchema = Yup.object({
    // email: Yup.string().required("Required*"),
    // companyName: Yup.string().required("Required*"),
    // location: Yup.string().required("Required*"),
    // address: Yup.string().required("Required*"),
    // contactPersonName: Yup.string().required("Required*"),
    // contactNumber: Yup.string().required("Required*"),
    vendorListCategory: Yup.string().required("Required*"),
    // websiteUrl: Yup.string().required("Required*"),
    // linkdinUrl: Yup.string().required("Required*"),
    checkBox: Yup.boolean(),
  });
  console.log(data);
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
        aria-hidden="true">
        <div
          class="modal-dialog"
          style={{ maxWidth: "inherit", margin: "50px" }}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Update Suggested Vendor
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setRenderModal(false)}></button>
            </div>
            <div class="modal-body">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                className="contact-form">
                <Form autoComplete="off">
                  <div className="row p-1">
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Email
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="email"
                            />
                            <ErrorMessage component={TextError} name="email" />
                          </div>

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Company Name
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="companyName"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="companyName"
                            />
                          </div>

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Location
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="location"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="location"
                            />
                          </div>

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Address
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="address"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="address"
                            />
                          </div>

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Contact Person Name
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="contactPersonName"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="contactPersonName"
                            />
                          </div>
                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Project Names
                            </label>
                            <Field
                              disabled
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="projectName"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="projectName"
                            />
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
                              className="fs-5 ff-montserrat">
                              Contact Number
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="contactNumber"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="contactNumber"
                            />
                          </div>

                        

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Vendor List Category
                            </label>
                            <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            as='select'
                            placeholder="Name"
                            name="vendorListCategory"
                          
                            >
                              {" "}
                              <option value="">Select Vendor Category</option>
                              {projectCategoryList.filter(v=>v["vendor list category"]).map((project) => {let projectName = project["vendor list category"]; return(<option value={projectName}>{projectName}</option>)})}
                            </Field>
                            <ErrorMessage
                              component={TextError}
                              name="vendorListCategory"
                            />
                          </div>

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Website Url
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="websiteUrl"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="websiteUrl"
                            />
                          </div>

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Linkdin Url
                            </label>
                            <Field
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="linkdinUrl"
                            />
                            <ErrorMessage
                              component={TextError}
                              name="linkdinUrl"
                            />
                          </div>

                          <div className="py-2">
                            <label
                              htmlFor=" required"
                              className="fs-5 ff-montserrat">
                              Add New Project
                            </label>
                            <Field
                              as="select"
                              className="form-control border-0 border-bottom rounded-0"
                              id=""
                              placeholder="Enter"
                              name="addAnotherProject">
                              {" "}
                              <option value="">Select Project Name</option>
                              {projectList.map((project) => {let projectName = project["project name"]; return(<option value={projectName}>{projectName}</option>)})}
                            </Field>
                            <ErrorMessage
                              component={TextError}
                              name="addAnotherProject"
                            />
                          </div>

                          {/* <div className="py-2">
                            <Field
                              type="checkbox"
                              className=""
                              name="checkBox"
                            />{" "}
                            <span className="px-1">
                              <label
                                htmlFor=" required"
                                className="fs-5 ff-montserrat">
                                Add to Suggested
                              </label>
                            </span>
                            <ErrorMessage
                              component={TextError}
                              name="checkBox"
                            />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button text-center py-3">
                    <div class="modal-footer d-flex justify-content-around">
                      <button
                        type="button"
                        id="closeModal"
                        class="btn btn-lg btn-danger rounded-0 d-none fw-normal ff-montserrat px-5 py-2"
                        data-bs-dismiss="modal">
                        Close
                      </button>

                      <button
                        type="submit"
                        className="btn btn-lg btn-primary rounded-0 fw-normal ff-montserrat px-5 py-2">
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
