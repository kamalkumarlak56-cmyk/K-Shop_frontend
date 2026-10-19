export const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const getAccessToken = () => localStorage.getItem("kshop_access_token")
export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("kshop_user") || "null")
  } catch {
    return null
  }
}

export const saveAuth = (data) => {
  localStorage.setItem("kshop_access_token", data.accessToken)
  localStorage.setItem("kshop_user", JSON.stringify(data.user))
}

export const clearAuth = () => {
  localStorage.removeItem("kshop_access_token")
  localStorage.removeItem("kshop_user")
}

export const authHeaders = () => {
  const token = getAccessToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
