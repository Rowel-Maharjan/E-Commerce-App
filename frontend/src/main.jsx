import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from './components/ErrorPage'
import { store } from './store/store.js';
import { Provider } from 'react-redux'
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
import App from './App.jsx'


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      {path: "register", element: <Register /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {path: "dashboard" , element: <AdminDashboard /> },
      {path: "features", element: <AdminFeatures /> },
      {path: "orders", element: <AdminOrders /> },
      {path: "products", element: <AdminProducts /> }
    ]
  },
  {
    path: "/shop",
    element: <ShoppingLayout />,
    errorElement: <ErrorPage />,
    children: [
      {path: "account" , element: <Account /> },
      {path: "checkout", element: <Checkout /> },
      {path: "home", element: <Home /> },
      {path: "listing", element: <Listing /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
