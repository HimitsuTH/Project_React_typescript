import "./App.css";
import Login from "@/components/pages/Login";
import Index from "@/components/pages/Index";
import Navbar from "@/components/header/Navbar";
import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Brand from "./components/pages/Brand";

function App() {
  const [path, setPath] = useState<boolean>(true);
  const location = useLocation();
  const usePathname = () => {
    if (location.pathname === "/user/login") {
      setPath(true);
    } else {
      setPath(false);
    }
    return path;
  };

  useEffect(() => {
    usePathname();
  }, [location.pathname]);
  return (
    <div className="relative">
      <Navbar path={path} />
      
      <div className="">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
