"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoadingScreen from "../components/Loading"

export default function Profile() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  useEffect(() => {
    async function getUserData() {
      try {
        setLoading(true)
        const request = await axios.get("/api/users/me")
        setUserId(request.data.user._id)
        router.push(`/profile/${userId}`)
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [userId])
  return (
    <div className="flex flex-col items-center m-auto my-10 justify-center">
      <h1 className="text-2xl">Loading your profile...</h1>
      {loading ? <LoadingScreen/> : "Ok!"}
    </div>
  )
}
