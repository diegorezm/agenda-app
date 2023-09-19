"use client"
import axios from "axios";
import { Input } from "../components/Input";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface User {
  email: string;
  password: string
}
export default function LoginPage() {
  const [user, setUser] = useState<User>({
    email: "",
    password: ""
  })

  const router = useRouter()

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    const updatedUser = { ...user, [fieldName]: fieldValue };
    setUser(updatedUser);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("/api/users/login", user)
      toast.success("Login was successful!")
      window.location.reload()
      router.push("/")
    } catch (error: any) {
      console.log("Login failed!", error.message);
      toast.error(error.message)

    }
  }
  return (
    <div>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center my-28 shadow-lg w-3/5 m-auto">
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
        <button type="submit" className="bg-blue-500 text-white rounded-full w-20 my-2 hover:bg-blue-300">Sign Up</button>

      <a href="/signup" className="text-blue-500 hover:text-blue-600">Don't have an account yet? click here!</a>
      </form>
    </div>
  )
}
