import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layout/LayoutClient";
import Cart from "./pages/client/Cart";
import CartPage from "./pages/client/CartPage";

function App() {
    const handleQuantityChange = (quantity: number) => {
    // handle quantity change logic
  };

  const handleDelete = () => {
    // handle delete logic
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />} />
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/carts" element={<Cart  onQuantityChange={handleQuantityChange} onDelete={handleDelete} />}></Route>
      </Routes>
    </>
  );
}

export default App;
