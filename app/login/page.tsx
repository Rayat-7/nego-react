"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { isTokenValid } from "@/lib/auth"

interface DecodedToken {
  roles: string[]
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token && isTokenValid(token)) {
      router.push("/dashboard")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await axios.post("https://tekshilpa.com:7070/negotiation-system/auth/login", {
        email,
        password,
        rememberMe: true,
      })

      const token = response.data.accessToken

      // Decode token to check roles
      const decoded = jwtDecode(token) as DecodedToken

      if (decoded.roles.includes("ROLE_ADMIN")) {
        // Save token to localStorage
        localStorage.setItem("accessToken", token)
        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Access denied. You are not an admin.")
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-blue-50 p-8 flex items-center justify-center">
        <div className="max-w-md space-y-4 text-center md:text-left">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            G-to-G Negotiation Data Management System
          </h1>
          <p className="text-gray-600">
            Bangladesh Petroleum Corporation (BPC) imports petroleum products like Gasoil, Jet A-1, Gasoline, HSFO, and
            Marine Fuel. This system helps improve data accessibility, minimize paperwork, and streamline the
            negotiation process.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">Secure access for authorized personnel only</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}











// 'use client'; // if using app directory

// import { useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";
// import router from 'next/router';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         'https://tekshilpa.com:7070/negotiation-system/auth/login',
//         {
//           email,
//           password,
//           rememberMe: true,
//         }
//       );
  
//       const token = response.data?.accessToken || response.data?.token;
  
//       if (token) {
//         localStorage.setItem('token', token);
//         setError('');
  
//         // Decode token to check user role
//         const decoded = jwtDecode(token);
//         const roles = decoded?.roles || [];
  
//         if (roles.includes('ROLE_ADMIN')) {
//           router.push('/dashboard'); // ✅ Redirect to dashboard
//         } else {
//           setError('Access denied. You are not an admin.');
//         }
//       } else {
//         setError('Invalid response from server.');
//       }
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Section - Info */}
//       <div className="w-1/2 bg-blue-50 p-10 flex items-center justify-center">
//         <div>
//           <h1 className="text-3xl font-bold text-blue-900 mb-4">
//             G-to-G Negotiation Data Management System
//           </h1>
//           <p className="text-blue-700">
//             Bangladesh Petroleum Corporation (BPC) imports petroleum products
//             like Gasoil, Jet A-1, Gasoline, HSFO, and Marine Fuel. This system
//             helps improve data accessibility, minimize paperwork, and streamline
//             the negotiation process.
//           </p>
//         </div>
//       </div>

//       {/* Right Section - Login */}
//       <div className="w-1/2 bg-white flex items-center justify-center">
//         <div className="w-full max-w-md p-8">
//           <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 border border-gray-300 rounded mb-4"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 border border-gray-300 rounded mb-4"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>

//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }
