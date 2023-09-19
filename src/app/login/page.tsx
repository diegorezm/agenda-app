"use client"
import axios from "axios";
import { Input } from "../components/Input";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/Loading";
import Image from "next/image";
import foto1 from '@/assets/teamwork high five-bro.svg'
interface User {
  email: string;
  password: string
}
export default function LoginPage() {
  const [user, setUser] = useState<User>({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    const updatedUser = { ...user, [fieldName]: fieldValue };
    setUser(updatedUser);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post("/api/users/login", user)
      toast.success("Login was successful!")
      router.push("/profile")
    } catch (error: any) {
      console.log("Login failed!", error.message);
      toast.error(error.message)
    } finally {
      setLoading(false)
      window.location.reload()
    }
  }
  return (
    <div className="flex flex-row">
      <div className="m-4">
        <Image src={foto1} alt="image" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center my-32 shadow-lg w-3/5 m-auto">
        <h1 className="p-2 text-3xl">
          Login
        </h1>
        <Input
          label="Email"
          value={user.email}
          type="email"
          onChange={(value) => handleInputChange("email", value)}
        />
        <Input
          label="Password"
          type="password"
          value={user.password}
          onChange={(value) => handleInputChange("password", value)}
        />
        <button type="submit" className="bg-blue-500 text-white rounded-full w-20 h-8 my-2 hover:bg-blue-300">{loading ? <LoadingScreen /> : "Login"}</button>
        <a href="/signup" className="text-blue-500 hover:text-blue-600">Don't have an account yet? click here!</a>
      </form>
    </div>
  )
}
