import React from 'react'
import AppContext from './AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ToastContainer, toast,Bounce } from 'react-toastify';

function AppState(props) {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [profileData, setProfileData] = useState();
    const [userCart,setCart]=useState([])
    const [reload, setReload] = useState(false);


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
        userProfile();
        getToCart();
       

      }
      fetchProduct(); 
     
    }, [token,reload])
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

        // console.log("this is api response after login",apiResponse)
        // console.log("this is reponse token",apiResponse.data.token)
        const receivedToken =  apiResponse.data.token
        setToken( receivedToken)
        localStorage.setItem("token",receivedToken)
        setisAuthenticated(true)// to show the dynamic navbar
        
        
        return apiResponse.data

    }
    // log out the user 
    // setToken empty authentication false
    const logoutUser=()=>{
      setToken("")
      setisAuthenticated(false)
      localStorage.removeItem("token")
    }

    // get user profile data
    const userProfile = async()=>{
        const profile= await  axios.get(`${url}/api/user/profile`,{
           headers: {
          "Content-Type": "Application/json",
           "Auth":token
        },
        withCredentials: true,
        })
      //  console.log(token)
      //  console.log("user profile data",profileData)
       setProfileData(profile)

      }
      // add to cart
      const addToCart = async(productId,title,description,price,qty,imgSrc)=>{
        const product= await  axios.post(`${url}/api/cart/add`,{productId,title,description,price,qty,imgSrc},{
           headers: {
          "Content-Type": "Application/json",
          "Auth":token
        },
        withCredentials: true,
        })
        //  console.log(product.data.cart.items)
        //  setCart(...userCart,product.data.cart.items)
        toast.success(product.data.message, {
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
        setReload(!reload);

      }

      // console.log(userCart)
      // get user cart item which are already exited
        const getToCart = async()=>{
        const productList= await  axios.get(`${url}/api/cart/user`,{
           headers: {
          "Content-Type": "Application/json",
          "Auth":token
         
        },
        withCredentials: true,
        })
        //  console.log(product.data.cart.items)
        // console.log(productList.data.cart.items)
        setCart(productList.data.cart.items)

      }
      console.log(" this is fecheted cart item",userCart)

      //decrease the quantity of cart product
      const decreaseQuantity = async( productId, qty)=>{
        const productList= await  axios.post(`${url}/api/cart/--qty`,{ productId, qty},{
           headers: {
          "Content-Type": "Application/json",
          "Auth":token
         
        },
        withCredentials: true,
        })
        //  console.log(product.data.cart.items)
        // console.log(productList.data.cart.items)
        setReload(!reload);

      }

      //  remove Item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/api/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // clear the cart function

   const clearCart = async () => {
    const api = await axios.delete(`${url}/api/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

 

    
    
  return (
    <>
    <AppContext.Provider value={{products,register,loginUser,isAuthenticated,url,token,setisAuthenticated,logoutUser,addToCart,userCart,decreaseQuantity,removeFromCart,clearCart}}>
        {props.children}
    </AppContext.Provider>
    </>
  )
}

export default AppState