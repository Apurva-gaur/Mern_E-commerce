import React, { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigte=useNavigate();

  const { setFilteredData, products, logoutUser , isAuthenticated, userCart } =useContext(AppContext);

  const submitHandler = (e) => {
    e.preventDefault();
    //  navigation to search product component which takes the form value
    navigte(`/product/search/${searchTerm}`)
    setSearchTerm("");
  };
  
  
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md px-6 py-6 flex flex-col gap-2">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mx-5">
        {/* Logo */}
        <span
          onClick={() => {
            navigte("/")
          }}
          className="text-2xl font-bold text-green-600 cursor-pointer"
        >
          MERN E-Commerce
        </span>

        {/* Search Bar */}
        <form
          onSubmit={submitHandler}
          className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white"
        >
          <span className="material-symbols-outlined px-3 text-gray-500">
            search
          </span>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 outline-none w-48 sm:w-64 text-sm"
          />
        </form>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Cart Button */}
              <Link to="/cart">
            
              <button
                className="relative text-green-600 hover:text-green-700 transition"
                aria-label="Cart" >
              
                
                <FiShoppingCart className="text-2xl" />
                {userCart?.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                    {userCart.length}
                  </span>
                )}
              </button></Link>

              {/* Profile Button */}
              <Link to="/profile">
              <button
                onClick={() => alert("Profile clicked!")}
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full"
              >
                Profile
              </button>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => {
                  logoutUser() 
                   navigte("/")
                  
                }}
                className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
              <button
                onClick={() => alert("Login clicked!")}
                className="text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-full"
              >
                Login
              </button>
              </Link>
              <Link to="/register"><button
                onClick={() => alert("Register clicked!")}
                className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full"
              >
                Register
              </button></Link>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
