import { useEffect, useState } from "react";
import * as productService from "../services/productService";

function Products() {
  const [products, setProducts] = useState({
    array: [],
    components: [],
  });

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
    return (
      <div key={"product-" + product.id} className="products__card">
        <div className="products__card--header">
          <h3 className="heading-tertiary">{product.name}</h3>
          <p className="alt-font products__card--price">${product.price}</p>
        </div>
        <div className="products__card--main">
          <p className="products__card--description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
            ipsam optio architecto...
          </p>
          <p className="products__card--quantity alt-font">
            {product.quantity} available
          </p>
        </div>
        <div className="products__card--footer">
          <div className="products__card--category">
            <p className="alt-font subtext">{product.category.name}</p>
          </div>
          <button type="button" className="btn btn-atc">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="products-header">
        <h1 className="heading-primary products-heading">Products</h1>
        {/* <div className="products-header-buttons">
          <div className="btn btn-header">Add A Product</div>
        </div> */}
      </div>
      <div className="products">{products.components}</div>
    </>
  );
}

export { Products };
