import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorPage from './components/ErrorPage.jsx';
import AuthLayout from './components/auth/AuthLayout.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import AdminLayout from './components/adminView/adminLayout/AdminLayout.jsx';
import AdminDashboard from './components/adminView/AdminDashboard.jsx';
import AdminFeatures from './components/adminView/AdminFeatures.jsx';
import AdminOrders from './components/adminView/AdminOrders.jsx';
import AdminProducts from './components/adminView/AdminProducts.jsx';
import ShoppingLayout from './components/shoppingView/shoppingLayout/ShoppingLayout.jsx';
import Account from './components/shoppingView/Account.jsx';
import Checkout from './components/shoppingView/Checkout.jsx';
import Home from './components/shoppingView/Home.jsx';
import Listing from './components/shoppingView/Listing.jsx';
import Authentication from './components/Authentication.jsx';
import { Route, Routes } from 'react-router-dom';
import { checkAuth } from './store/auth-slice/index.js';
import axios from 'axios';


function App() {

  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth)  //To obtain the value of state
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])    //To get the get-request when page is refreshed.. This is done


  // Another Method to make isAuthenticated = true even though page is refreshed
  // const authenticate = async () => {
  //   const response = await axios.get("http://localhost:3000/api/auth/checkauth",
  //     {
  //       withCredentials: true
  //     })
  //   return response.data

  // }

  // useEffect(() => {
  //    authenticate().then((response)=>{
  //      dispatch(checkAuth(response))
  //    })
  // }, [dispatch])


  //This is also very important to manage time of components
  if (isLoading) {
    return <div className=''>Hello</div>
  }


  return (
    <>
      <Routes>
        <Route path='/auth' element={<Authentication isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </Authentication>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path='/admin' element={<Authentication isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </Authentication>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route path='/shop' element={<Authentication isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </Authentication>}>
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
