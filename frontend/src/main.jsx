import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from './components/ErrorPage'
import { store } from './store/store.js';
import { Provider } from 'react-redux'
import Layout from './components/auth/Layout.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      {path: "register", element: <Register /> }
    ]
  },
  {
    path: "/",
    element: <App />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
