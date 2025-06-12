import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const Register = () => {
 const{ register }= useContext(AppContext)
 const navigate= useNavigate()
 
  const[formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  })
    const handleRegister=async(e)=>{
      e.preventDefault()
     const result=await register(formData.name,formData.email,formData.password)
    //  console.log("data is saved in db")
    if(result.success==true){
      navigate("/login")


    }

        
    }
    const onChangeHandler= (e)=>{
      const{ name,value}=e.target
      setFormData({...formData,[name]:value})

    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Account 🚀
        </h2>
        <p className="text-sm text-center text-gray-500">
          Please fill in the details to register
        </p>
        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                   name="email"
              value={formData.email}
              onChange={onChangeHandler}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              required
              placeholder="Create password"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
           
              required
              placeholder="Repeat password"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
