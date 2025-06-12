import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const RelatedProduct = ({category}) => {
  const { products } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);


  
  useEffect(() => {
    const fiterProduct = products.filter(
      (singleItem) => singleItem?.category?.toLowerCase() == category.toLowerCase()
    );
    setRelatedProducts(fiterProduct)
   
  }, [category,products]);

  if (!relatedProducts.length) {
    console.log("related product is empty");
  }
  console.log(category)

  return (
    <div className="mt-16 px-6 sm:px-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition hover:shadow-xl hover:-translate-y-1"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.imgSrc}
                alt={product.title}
                className="h-40 object-contain mb-3"
              />
            </Link>
            <h3 className="text-md font-semibold text-gray-700 text-center truncate w-full">
              {product.title}
            </h3>
            <p className="text-red-600 font-bold text-md mt-1">
              ₹{product.price}
            </p>
            <button
              onClick={() => alert("clicked ")}
              className="mt-3 text-green-600 font-medium hover:underline transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
