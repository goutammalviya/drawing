import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar card m-3 border-0 navbar-expand-lg navbar-light px-4 box-shadow" style={{backgroundColor: "rgb(26, 28, 40)" , color: "white"}}>
        <div className="d-flex card-body  w-100 justify-content-between">
          <div className="center-xy">
            {" "}
            <a className="navbar-brand h1 m-0 fs-3 fw-bold" style={{color: "white"}} href="#">
              Map Management
            </a>
          </div>
          <div
            className="collapse navbar-collapse fw-semibold justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav fs-4" style={{color: "white"}}>
              <NavLink className="nav-item nav-link  " to="/">
                {/* Add Vendor */}
              </NavLink>
              <NavLink className="nav-item nav-link " to="/vendor">
                Dummy Table
              </NavLink>
              <NavLink className="nav-item nav-link " to="/suggested_vendors">
              {/* <span className="" style={{color: "aliceblue"}}>  suggested vendors</span> */}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
