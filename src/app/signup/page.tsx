"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../components/Input";

interface UserInfo {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const route = useRouter()
  const [user, setUser] = useState<UserInfo>({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    const updatedUser = { ...user, [fieldName]: fieldValue };
    setUser(updatedUser);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post("/api/users/signup", user)
      toast.success("Signup concluded!")
      route.push("/login")
    } catch (error: any) {
      console.log("Signup failed!", error.message)
      toast.error("Signup failed!")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center my-28 shadow-lg w-3/5 m-auto">
      <Input
        label="Username"
        value={user.username}
        onChange={(value) => handleInputChange("username", value)}
      />
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

      <a href="/login" className="text-blue-500 hover:text-blue-600">Already hava an account? click here!</a>
    </form>
  );
}

