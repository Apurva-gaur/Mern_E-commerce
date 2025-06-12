import React, { useContext } from "react";
import AppContext from "../../Context/AppContext.js";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  console.log(products)

  return (
    <div className="px-10 py-10 bg-gray-100 min-h-screen border border-red-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg border border-gray-200 shadow-xl flex flex-col items-center transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Image */}
            <Link to={`/product/${product._id}`}>
             <div className="pt-4 pb-2">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="h-44 object-contain"
              />
            </div>
            </Link>
           

            {/* Title / Price / Button */}
            <div className="w-full px-4 pb-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
                {product.title}
              </h2>
              <p className="text-red-600 font-bold text-md mb-2">
                ₹{product.price}
              </p>
              <button
                onClick={() =>
                  addToCart(
                    product._id,
                    product.title,
                    product.price,
                    1,
                    product.imgSrc
                  )
                }
                className="text-green-600 font-medium hover:underline transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
