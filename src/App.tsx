import "./App.css";
import Login from "@/components/pages/Login";
import Index from "@/components/pages/Index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
