import { useEffect, useState } from "react";
import * as productService from "../services/productService";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState({
    array: [],
    components: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    productService
      .getAll()
      .then(onGetAllProductsSuccess)
      .catch(onGetAllProductsError);
  }, []);

  useEffect(() => {
    setProducts((prev) => {
      const newProducts = { ...prev };
      newProducts.components = newProducts.array.map(productMapper);
      return newProducts;
    });
  }, [products.array]);

  const onGetAllProductsSuccess = (response) => {
    console.log("onGetAllProductsSuccess", response);
    const { data } = response;

    setProducts((prev) => {
      const newProducts = { ...prev };
      newProducts.array = data;
      return newProducts;
    });
  };

  const onGetAllProductsError = (error) => {
    console.error("onGetAllProductsError", error);
  };

  const productMapper = (product) => {
    return <ProductCard key={"product-card" + product.id} product={product} />;
  };

  const onAddProductClick = () => {
    navigate("/products/form");
  };

  return (
    <>
      <div className="products-header">
        <h1 className="heading-primary products-heading">Products</h1>
        <div className="products-header-buttons">
          <button
            onClick={onAddProductClick}
            type="button"
            className="btn btn-header"
          >
            Add A Product
          </button>
        </div>
      </div>
      <div className="products">{products.components}</div>
    </>
  );
}

export { Products };
