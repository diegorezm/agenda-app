export default function Navbar() {
  return (
    <nav className="flex items-center align-middle justify-between p-2 bg-lime-900 h-2/3 text-gray-900">
      <div className="text-2xl text-white">
      <a href="/">Agenda</a>
      </div>
      <div>
      <a href="/signup"><span className="hover:text-blue-100 cursor-pointer">Enter</span></a>
      </div>
    </nav>

  )
}
