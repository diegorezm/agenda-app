"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CreateContact from "@/app/components/CreateContact"

export default function ProfilePage() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: ""
  })
  const [showForm, setShowForm] = useState(false)
  const showHideForm = () => {
    setShowForm(prev => !prev)
  }
  const getUserData = async () => {
    const request = await axios.get("/api/users/me")
    setUser(request.data.user)
  }

  useEffect(() => {
    try {
      getUserData()
    } catch (error: any) {
      console.error(error.message)
      toast.error("Something went wrong!")
    }
  }, [])
  return (
    <div>

      {showForm && <CreateContact showHideForm={showHideForm} />}
      <div className="absolute bottom-0 right-2 m-5">
        <button className="bg-blue-500 h-14 w-14 rounded-full text-white hover:h-20 hover:w-20 transition-transform transform hover:scale-110" onClick={showHideForm}>+</button>
      </div>
    </div>
  )
}
