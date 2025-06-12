import { useState } from 'react'
import Navbar from './Component/Navbar'
import { useContext } from 'react'
import AppContext from './Context/AppContext';
import ShowProduct from './Component/Product/ShowProduct';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './Component/Product/ProductDetail';
import SearchProduct from './Component/Product/SearchProduct';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import { ToastContainer } from 'react-toastify';
import Profile from './Component/User/Profile';



function App() {
  const {da}=useContext(AppContext);
  const [count, setCount] = useState(0)

  return (
    <>

  
   <div className='bg-gray-100'>
    <Router>
      <Navbar />
      <ToastContainer/>
    
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/oderconfirmation" element={<OrderConfirmation />} /> */}
      </Routes>
    </Router>
   </div>
 
    </>
  )
}

export default App
