import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const Authentication = ({ isAuthenticated, user, children }) => {
    const location = useLocation()

    if (!isAuthenticated && !(location.pathname.includes("login") || location.pathname.includes("register"))) {
        return <Navigate to="/auth/login" />
    }
    if (isAuthenticated && user.role === "admin" && !(location.pathname.includes("admin"))) {
        return <Navigate to="/admin/dashboard" />
    }
    if (isAuthenticated && user.role === "user" && !(location.pathname.includes("shop"))) {
        return <Navigate to="/shop/home" />
    }
    return children

}   

export default Authentication
