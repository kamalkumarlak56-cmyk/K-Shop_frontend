import { Navigate, useLocation } from "react-router-dom"
import { getAccessToken } from "@/lib/auth"

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  return getAccessToken() ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

export default ProtectedRoute
