import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  roles: string[]
  exp: number
  sub: string
}

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token) as DecodedToken
    const currentTime = Date.now() / 1000

    return decoded.exp > currentTime
  } catch (_error) {
    // Prefix with underscore to indicate intentionally unused variable
    return false
  }
}

export const isAdmin = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token) as DecodedToken
    return decoded.roles.includes("ROLE_ADMIN")
  } catch (_error) {
    // Prefix with underscore to indicate intentionally unused variable
    return false
  }
}

export const getUser = (token: string): { username: string } | null => {
  try {
    const decoded = jwtDecode(token) as DecodedToken
    return {
      username: decoded.sub,
    }
  } catch (_error) {
    // Prefix with underscore to indicate intentionally unused variable
    return null
  }
}
