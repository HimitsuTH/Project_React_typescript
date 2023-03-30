import "./App.css";

import Index from "@/components/pages/Index";
import Navbar from "@/components/header/Navbar";

//user && auth
import Login from "@/components/pages/Login";
import EditUser from "./components/pages/user/EditUser";

//Brand
import Brand from "./components/pages/brand/Brand";
import Brand_id from "@/components/pages/brand/Brand.id";
import AddBrand from "./components/pages/brand/AddBrand";

//Headphone
import Headphone from "@/components/pages/headphone";
import AddHeadphone from "./components/pages/headphone/addHeadphone";
import UpdateHeadphone from "./components/pages/headphone/updateHeadphone";

import { getCurrentUser } from "@/services/user.service";
import { tokenStr } from "./services/header.service";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [path, setPath] = useState<boolean>(true);
  const location = useLocation();
  const usePathname = () => {
    if (location.pathname === "/login") {
      setPath(true);
    } else {
      setPath(false);
    }
    return path;
  };

  useEffect(() => {
    usePathname();
  }, [location.pathname]);

  useCallback(() => {
    getCurrentUser();
  }, [tokenStr]);
  return (
    <div className="relative">
      <Navbar path={path} />

      <div className="">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/brand/:id" element={<Brand_id />} />
          <Route path="/user" element={<EditUser />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/brand/add" element={<AddBrand />} />
          <Route path="/headphone/" element={<Headphone />} />
          <Route path="/headphone/add" element={<AddHeadphone />} />
          <Route path="/headphone/:id/update" element={<UpdateHeadphone />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
