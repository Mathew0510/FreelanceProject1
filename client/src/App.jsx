import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>

      <div className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-gray-900
        to-black
        text-white
      ">

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Products />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;