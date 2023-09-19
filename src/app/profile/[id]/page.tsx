"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CreateContact from "@/app/components/CreateContact"
import ContactCard from "@/app/components/ContactCard"
import EditContact from "@/app/components/EditContact"

interface contact {
  _id: string,
  name: string,
  email: string,
  phone_number: number,
  author: string,
}

export default function ProfilePage() {
  const [contact, setContact] = useState<contact[]>([])
  const [showForm, setShowForm] = useState(false)
  const [ showEditForm, setShowEditForm] = useState(false)
  const [ editId, setEditId] = useState("")
  const showHideForm = () => {
    setShowForm(prev => !prev)
  }
  const showHideEditForm = () => {
    setShowEditForm(prev => !prev)
  }
  const getContacts = async () => {
    const request = await axios.get("/api/contacts/get")
    setContact(request.data.contacts)
  }
  const deleteContacts = async (id: string, index: number) => {
    const updatedContacts = [...contact]
    updatedContacts.splice(index, 1)
    setContact(updatedContacts)
    try {
     await axios.post("/api/contacts/delete",{_id: id}) 
     toast.success("Contact deleted!")
    } catch (error: any) {
      console.error(error.message)
      toast.error("Something went wrong!")
      
    }
  }

  const editContacts = (id: string) => {
    setEditId(id)
    showHideEditForm()
  }

  useEffect(() => {
    try {
      getContacts()
    } catch (error: any) {
      console.error(error.message)
      toast.error("Something went wrong!")

    }
  }, [])
  return (
    <div>
      {showEditForm && <EditContact showHideForm={showHideEditForm} _id={editId}/>}
      {showForm && <CreateContact showHideForm={showHideForm} />}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">Agenda</h1>
        <h2 className="text-lg text-gray-700">Your contacts:</h2>

        {contact.length === 0 ? (
          <p className="text-gray-500">You don't have any contacts :(</p>
        ) : (
          <table className="w-1/2">
            <tbody>
              {contact.map((i, j) => (
                <ContactCard
                  deleteContacts={() => deleteContacts(i._id, j)}
                  editContacts={() => editContacts(i._id)}
                  index={j}
                  _id={i._id}
                  name={i.name}
                  email={i.email}
                  phone_number={i.phone_number}
                  key={i._id}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="absolute bottom-0 right-2 m-5">
        <button
          className="bg-blue-500 h-14 w-14 rounded-full text-white hover:h-20 hover:w-20 transition-transform transform hover:scale-110"
          onClick={showHideForm}
        >
          +
        </button>
      </div>
    </div>
  )             
}
