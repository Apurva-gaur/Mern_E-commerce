import React from 'react'
import AppContext from './AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ToastContainer, toast,Bounce } from 'react-toastify';

function AppState(props) {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState();
    const [isAuthenticated, setisAuthenticated] = useState(false);

    const url="http://localhost:3000"
    // get all the product
    useEffect(() => {
      const fetchProduct = async()=>{
        const product= await  axios.get(`${url}/api/product/all`,{
           headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
        })
        // console.log(product.data.products)
        setProducts(product.data.products)

      }
      fetchProduct(); 
     
    }, [])
    // register user
    const register=async(username,email,password)=>{
     const apiResponse= await  axios.post(`${url}/api/user/register`,{username,email,password},{
           headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
        })
        // console.log(apiResponse)
        // tostify case
        toast.success(apiResponse.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        return apiResponse.data

    }
    // login the user
    const loginUser=async(email,password)=>{
     const apiResponse= await  axios.post(`${url}/api/user/login`,{email,password},{
           headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
        })
        // console.log(apiResponse)
        // tostify case
        toast.success(apiResponse.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

        console.log(apiResponse)
        setToken(apiResponse.data.token)
        localStorage.setItem("token",token)
        setisAuthenticated(true)// to show the dynamic navbar
        
        return apiResponse.data

    }
    // log out the user
    const logoutUser=()=>{
      setToken("")
      setisAuthenticated(false)
      localStorage.removeItem("token")
    }
    
  return (
    <>
    <AppContext.Provider value={{products,register,loginUser,isAuthenticated,url,token,setisAuthenticated,logoutUser}}>
        {props.children}
    </AppContext.Provider>
    </>
  )
}

export default AppState