"use client"
import axios from "axios"
import { useState } from "react"
export default function Navbar() {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  useState(() => {
    async function isLoggedin() {
      try {
        const request = await axios.get("/api/users/isLoggedin")
        if (request.data.token) setIsLoggedIn(true)
      } catch (error: any) {
        console.error(error.message);
        setIsLoggedIn(false)
      }
    }
    isLoggedin()
  }, [isLoggedin])

  return (
    <nav className="flex items-center align-middle justify-between p-2 bg-lime-900 h-2/3 text-gray-900">
      <div className="text-2xl text-white">
        <a href="/">Agenda</a>
      </div>
      <div>
        <a href="/login"><span className="text-white hover:text-blue-100 cursor-pointer">{isLoggedin ? "Perfil" : "Login"}</span></a>
      </div>
    </nav>

  )
}
