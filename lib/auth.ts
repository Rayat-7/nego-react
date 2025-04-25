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
  } catch (error) {
    return false
  }
}

export const isAdmin = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token) as DecodedToken
    return decoded.roles.includes("ROLE_ADMIN")
  } catch (error) {
    return false
  }
}

export const getUser = (token: string): { username: string } | null => {
  try {
    const decoded = jwtDecode(token) as DecodedToken
    return {
      username: decoded.sub,
    }
  } catch (error) {
    return null
  }
}
