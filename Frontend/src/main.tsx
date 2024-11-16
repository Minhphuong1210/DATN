import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { LoadingProvider } from "./context/Loading.tsx";
import { configAxios } from "./config/aixos.ts";
import { CartProvider } from "./context/Cart.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
configAxios();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <CartProvider>
          {/* bọc vào đây */}
          <SearchProvider>
          <App />
        </SearchProvider>
        </CartProvider>
      </BrowserRouter>
    </LoadingProvider>

  </StrictMode>,

);
