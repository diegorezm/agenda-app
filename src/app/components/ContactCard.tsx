interface contact {
  name: string,
  email: string,
  _id: string,
  phone_number: number,
  index: number
  deleteContacts(): void,
  editContacts():void
}
export default function ContactCard({ name, email,_id, phone_number, index , deleteContacts, editContacts}: contact) {
  return (
    <tr className="bg-gray-100 border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {phone_number}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <button className="text-blue-600 hover:text-blue-400" onClick={editContacts}>edit</button>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <button className="text-red-600 hover:text-red-400" onClick={deleteContacts}>delete</button>
      </td>
    </tr>
  );
}

