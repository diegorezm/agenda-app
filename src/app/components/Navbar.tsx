"use client"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
const Profile = () => {
  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("User has been logged out!")
      router.push("/login")
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      window.location.reload()
    }
  }
  return (
    <div>
      <div className="group">
        <div className="flex flex-row cursor-pointer">
          <span className="text-white hover:text-blue-100">Profile</span>
          <svg className="w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>

        </div>
        <div className="hidden absolute right-2 group-hover:flex group-hover:flex-col  group-hover:bg-white group-hover:w-16 group-hover:h-16 group-hover:justify-center group-hover:items-center hover:cursor-pointer rounded">
          <div className="hover:text-blue-800">
            <a href="/profile">Profile</a>
          </div>
          <div className="border-t border-t-black hover:text-blue-800" onClick={logout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}

const Login = () => {
  return (
    <div>
      <a href="/login"><span className="text-white hover:text-blue-100 cursor-pointer">Login</span></a>
    </div>
  )
}

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
      {isLoggedin ? <Profile /> : <Login />}
    </nav>

  )
}
