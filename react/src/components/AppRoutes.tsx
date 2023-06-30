import React from "react";
import { Route, Routes, BrowserRouter  } from "react-router-dom";

import AddProfessional from "./AddProfessional/AddProfessional";
import AddProfessionalType from "./AddProfessionalType/AddProfessionalType";

const AppRoutes: React.FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddProfessional />} />
          <Route path="/add-professional" element={<AddProfessional />} />
          <Route path="/add-type" element={<AddProfessionalType />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
export default AppRoutes;