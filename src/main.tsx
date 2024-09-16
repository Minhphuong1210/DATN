import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { LoadingProvider } from "./context/Loading.tsx";
import { configAxios } from "./config/aixos.ts";
configAxios();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoadingProvider>

  </StrictMode>,

);
