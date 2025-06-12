import React, { useContext,useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import RelatedProduct from "./RelatedProduct"
import axios from "axios";

function ProductDetail() {

  const [product, setProduct] = useState();
  const { id } = useParams();
  const url = "http://localhost:3000/api";

 useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);
  console.log("this is fected data",product)
  
  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Loading product...
      </div>
    );
  }

 return (
    <div className="bg-gray-100 min-h-screen py-10 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.imgSrc}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-red-600 text-xl font-semibold">
            ₹{product.price}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {product.description || "No description provided."}
          </p>
          <button
            onClick={() =>{alert("add to cart is clicked")}
             
            }
            className="bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div>
        <RelatedProduct category={product.category}></RelatedProduct>
      </div>
    </div>
  );
}

export default ProductDetail;
