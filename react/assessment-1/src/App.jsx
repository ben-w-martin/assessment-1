import { NavBar } from "./components/NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./style.css";
import { ProductCard } from "./components/ProductCard";
import { ProductForm } from "./components/ProductForm";
import { Products } from "./components/Products";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products/" element={<Products />}></Route>
            <Route path="/products/form" element={<ProductForm />}></Route>
            <Route path="/products/form/:id" element={<ProductForm />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
