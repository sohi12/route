import { useState } from "react";
import Outlet from "./Components/Outlet";
import Dynamic from "./Components/Dynamic.jsx"
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route path="/:id" element={<Dynamic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
