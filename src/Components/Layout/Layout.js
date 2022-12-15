import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../../Pages/Navbar";
import VendorTable from './../../Pages/VendorTable';

const UnknownURL = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, [navigate]);
};
const Layout = () => {
  return (
    <div style={{height:"100vh"}} >
      {/* <Navbar/> */}
      <Routes>
        <Route path="/vendor" element={<VendorTable />} />
        <Route path="/" element={<VendorTable />} />
        {/* <Route path="/suggested_vendors" element={<SuggestedVendorTable />} /> */}
        {/* <Route path="/" element={<VendorForm />} /> */}
        <Route path="*" element={<UnknownURL />} />
      </Routes>
    </div>
  );
};

export default Layout;
