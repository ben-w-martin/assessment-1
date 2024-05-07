import * as formik from "formik";
import { useEffect, useState } from "react";
import * as productService from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const [initialValues] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryId: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setIsEdit(true);
    }
  }, [params.id]);

  const handleSubmit = (values) => {
    let validated = validateForm(values);
    if (!validated) return;

    values.price = parseFloat(values.price);
    values.quantity = parseInt(values.quantity);
    values.categoryId = parseInt(values.categoryId);

    console.log(values);

    isEdit ? updateProduct(values, params.id) : addProduct(values);
  };

  const updateProduct = (values, id) => {
    productService
      .update(values, id)
      .then(onUpdateProductSuccess)
      .catch(onUpdateProductError);
  };

  const addProduct = (values) => {
    productService
      .add(values)
      .then(onAddProductSuccess)
      .catch(onAddProductError);
  };

  const onUpdateProductSuccess = (response) => {
    console.log("onUpdateProductSuccess", response);
  };

  const onUpdateProductError = (error) => {
    console.error("onUpdateProductError", error);
  };

  const validateForm = (values) => {
    for (let key in values) {
      console.log(values[key]);
      if (!values[key]) return false;
    }

    return true;
  };

  const onAddProductSuccess = (response) => {
    console.log("onAddProductSuccess", response);
    const { data } = response;
    navigate("/products/form/" + data);
  };

  const onAddProductError = (error) => {
    console.error("onAddProductError", error);
  };

  return (
    <>
      <div className="product-form-container">
        <formik.Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <formik.Form className="product__form">
            <h1 className="heading-primary product__form--heading">
              {isEdit ? "Edit Product" : "Add a Product"}
            </h1>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <formik.Field name="name" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <formik.Field name="price" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity Available</label>
              <formik.Field name="quantity" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="categoryId">Category</label>
              <formik.Field name="categoryId" as="select">
                <option value="0">...</option>
                <option value="1">Electronics</option>
                <option value="2">Home</option>
                <option value="3">Clothing</option>
                <option value="4">Food</option>
                <option value="5">Drink</option>
                <option value="6">Toys</option>
                <option value="7">Gifts</option>
                <option value="8">Tools</option>
                <option value="9">Books</option>
                <option value="10">Pharmacy</option>
              </formik.Field>
            </div>
            <div className="form-group product-submit">
              <button className="btn btn-submit" type="submit">
                {isEdit ? "Update" : "Submit"}
              </button>
            </div>
          </formik.Form>
        </formik.Formik>
      </div>
    </>
  );
}

export { ProductForm };
