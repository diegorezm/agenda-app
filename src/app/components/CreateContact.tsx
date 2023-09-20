import React, { useState } from "react";
import { contact } from "@/interfaces/contact";
import { Input } from "./Input";
import LoadingScreen from "./Loading";
import toast from "react-hot-toast";
import axios from 'axios'

interface props {
  showHideForm(): void,
  updateArray: (newContact: contact) => void
}

export default function CreateContact({ showHideForm , updateArray}: props) {
  const [isLoading, setIsloading] = useState(false)
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone_number: ""
  })

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    const updatedUser = { ...contact, [fieldName]: fieldValue };
    setContact(updatedUser);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsloading(true)
      const request = await axios.post("/api/contacts/create", contact)
      const newContact = request.data.newContact;
      
      updateArray((prev) => [...prev, newContact])
      toast.success("Contact created successfully!")

    } catch (error: any) {
      console.error(error.message)
      toast.error("Not able to create contact!")
    }finally{
      setIsloading(false)
      showHideForm()
    }
  }
  return (
    <div className=" fixed inset-0 flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100vh] bg-[rgba(0,0,0,0.4)] shadow-lg">
      <div className="bg-gray-200 h-1/2 w-1/2 rounded-lg">
        <div className="flex justify-end p-2">
          <button onClick={showHideForm} className="bg-gray-300 w-11 h-9 rounded-full" >x</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-h-full   justify-center items-center">
          <Input
            label="Name"
            value={contact.name}
            onChange={(value) => handleInputChange("name", value)}
          />

          <Input
            label="email"
            type="email"
            value={contact.email}
            onChange={(value) => handleInputChange("email", value)}
          />
          <Input
            label="Phone number"
            value={contact.phone_number}
            onChange={(value) => handleInputChange("phone_number", value)}
          />
          <div className="flex justify-center mx-auto my-2  w-32 h-10 rounded-full  text-gray-200 items-center text-center bg-blue-500 hover:bg-blue-400">
            <button type="submit" className="w-full">
              {isLoading ? <LoadingScreen /> : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
