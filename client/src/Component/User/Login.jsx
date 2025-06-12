import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const Login = () => {
  const{ loginUser }=useContext(AppContext)
  const navigate=useNavigate()
 const[formData,setFormData]=useState({
    email:"",
    password:""
  })
  const handleLogin = async(e) => {
    e.preventDefault();
    // check the credencials here
    // user is exist or not
   const result=await loginUser(formData.email,formData.password)
    if(result.success==true)
    {
      navigate("/")
    }
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500">
          Please enter your credentials to login
        </p>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required // notify user that field is required
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-500 font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
