import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Layout from "./Components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {
  return (
    <>
   <Router>
     <Routes>
       <Route path="/*" element={<Layout />} />
     </Routes>
   </Router>
    </>
  );
}

export default App;
