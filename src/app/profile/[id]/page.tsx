"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CreateContact from "@/app/components/CreateContact"
import ContactCard from "@/app/components/ContactCard"
import EditContact from "@/app/components/EditContact"
import { contact } from "@/interfaces/contact"

export default function ProfilePage() {
  const [contact, setContact] = useState<contact[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editContactInfo, setEditContactInfo] = useState<contact | null>();
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
      await axios.post("/api/contacts/delete", { _id: id })
      toast.success("Contact deleted!")
    } catch (error: any) {
      console.error(error.message)
      toast.error("Something went wrong!")

    }
  }

  const editContacts = (contactObj: contact) => {
    console.log(contactObj)
    setEditContactInfo(contactObj)
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
      {showForm && <CreateContact updateArray={setContact} showHideForm={showHideForm} />}
      {showEditForm && (
        <EditContact
          showHideForm={showHideEditForm}
          updateArray={(updatedContact) => {
            const updatedContacts = [...contact];
            const index = updatedContacts.findIndex((c) => c._id === updatedContact._id);
            if (index !== -1) {
              updatedContacts[index] = updatedContact;
              setContact(updatedContacts);
            }
          }}
          contactInfo={editContactInfo}
        />
      )}


      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">Agenda</h1>

        {contact.length === 0 ? (
          <p className="text-gray-500 py-2">You don't have any contacts!</p>
        ) : (
          <div>
            <div className="flex items-center justify-center m-2">
              <h2 className="text-lg text-gray-700">Your contacts:</h2>
            </div>
            <table className="w-1/2">
              <thead className="border-b font-medium bg-gray-100 dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Phone</th>
                  <th scope="col" className="px-6 py-4">Edit</th>
                  <th scope="col" className="px-6 py-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((i, j) => (
                  <ContactCard
                    deleteContacts={() => deleteContacts(i._id, j)}
                    editContacts={() => editContacts(i)}
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
          </div>
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
