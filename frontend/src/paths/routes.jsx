import ErrorPage from '../components/ErrorPage.jsx'
import AuthLayout from '../components/auth/AuthLayout.jsx';
import Login from '../components/auth/Login.jsx';
import Register from '../components/auth/Register.jsx';
import AdminLayout from '../components/adminView/adminLayout/AdminLayout.jsx';
import AdminDashboard from '../components/adminView/AdminDashboard.jsx';
import AdminFeatures from '../components/adminView/AdminFeatures.jsx';
import AdminOrders from '../components/adminView/AdminOrders.jsx';
import AdminProducts from '../components/adminView/AdminProducts.jsx';
import ShoppingLayout from '../components/shoppingView/shoppingLayout/ShoppingLayout.jsx';
import Account from '../components/shoppingView/Account.jsx';
import Checkout from '../components/shoppingView/Checkout.jsx';
import Home from '../components/shoppingView/Home.jsx';
import Listing from '../components/shoppingView/Listing.jsx';
import App from '../App.jsx';
import Authentication from '../components/Authentication.jsx';

const isAuthenticated = true
const user = {
  name: "Rowel",
  role: "user"
}

const routes = [
  {
    path: "/auth",
    element: <Authentication isAuthenticated={isAuthenticated} user={user}> <AuthLayout /> </Authentication>,
    errorElement: <ErrorPage />,
    children: [
      { path: "auth", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },
  {
    path: "/admin",
    element: <Authentication isAuthenticated={isAuthenticated} user={user}> <AdminLayout /> </Authentication>,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "features", element: <AdminFeatures /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "products", element: <AdminProducts /> }
    ]
  },
  {
    path: "/shop",
    element: <Authentication isAuthenticated={isAuthenticated} user={user}> <ShoppingLayout /> </Authentication>,
    errorElement: <ErrorPage />,
    children: [
      { path: "account", element: <Account /> },
      { path: "checkout", element: <Checkout /> },
      { path: "home", element: <Home /> },
      { path: "listing", element: <Listing /> }
    ]
  }
];

export default routes

