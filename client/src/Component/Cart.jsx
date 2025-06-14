import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";

const Cart = () => {
  const { userCart, decreaseQuantity, addToCart, removeFromCart, clearCart } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const price = userCart.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
      setTotalPrice(price);
    };

    getTotal();
  }, [userCart]);

  if (!userCart || userCart.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl font-medium">
        🛒 Your Amazon-style cart is empty
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Sticky Heading */}
        <div className="sticky top-0 z-20 bg-gray-100 py-4 border-b border-gray-300">
          <h2 className="text-3xl font-bold text-[#131921] tracking-tight">
            🛒 Shopping Cart
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Left Column: Items */}
          <div className="md:col-span-2 space-y-6">
            {userCart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col sm:flex-row gap-5 border border-gray-200"
              >
                {/* Product Image */}
                <img
                  src={item.imgSrc || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="w-32 h-32 object-contain border rounded-md"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description ||
                      "This product is known for its great quality and value. Limited stock available!"}
                  </p>

                  <p className="text-red-600 font-bold text-xl mt-2">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">Qty:</span>

                    <button
                      onClick={() => decreaseQuantity(item.productId, 1)}
                      className="px-2 py-1 border rounded text-sm font-bold bg-gray-200 hover:bg-gray-300"
                    >
                      −
                    </button>

                    <span className="px-3 py-1 border rounded text-sm bg-white">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        addToCart(
                          item.productId,
                          item.title,
                          item.description,
                          item.price / item.qty,
                          1,
                          item.imgSrc
                        )
                      }
                      className="px-2 py-1 border rounded text-sm font-bold bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 text-sm mt-4">
                    <button className="text-blue-600 hover:underline">
                      Save for later
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        if(confirm("are you sure ,you want to remove product from cart"))
                        {
                            removeFromCart(item.productId)}}
                        }
                       
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

           {/* right coloum summary */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white rounded-lg shadow-md border p-5">
              <p className="text-lg">
                Subtotal ({userCart.length} items):{" "}
                <span className="font-bold text-red-600 text-xl">
                  ₹{totalPrice}
                </span>
              </p>
              <button className="mt-5 w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold py-2.5 rounded">
                Proceed to Checkout
              </button>

 
              <button
                onClick={()=>clearCart()}
                className="mt-3 text-sm text-blue-600 hover:underline w-full text-left"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
