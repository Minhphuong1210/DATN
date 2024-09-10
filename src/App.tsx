import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layout/LayoutClient";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />} />
      </Routes>
    </>
  );
}

export default App;
