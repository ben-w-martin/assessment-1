function ProductCard({ product }) {
  return (
    <div className="products__card">
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
}

export { ProductCard };
