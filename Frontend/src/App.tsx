import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layout/LayoutClient";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
