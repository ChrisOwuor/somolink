import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const linkClass = ({ isActive }) =>
    `block py-3 px-6 rounded hover:bg-indigo-100 hover:text-indigo-700 transition ${
      isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700"
    }`;

  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 text-gray-900 transform z-50 transition-transform
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:inset-auto flex flex-col`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold p-6 border-b border-gray-200">
          SomoLink
        </div>

        {/* NAV LINKS - stay at top */}
        <nav className="p-4 space-y-2 flex-1">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/schools"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Schools
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            Settings
          </NavLink>

         
        </nav>

        {/* USER PROFILE - FIXED AT THE VERY BOTTOM */}
        
          <div className="p-5 flex items-center gap-3 mt-auto">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <NavLink
              to="/profile"
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <div className="leading-tight">
                <p className="text-sm font-semibold">Chrispine Owuor</p>
                <p className="text-xs text-gray-500">Admin</p>
                <p className="text-xs text-gray-400">chris@somolink.com</p>
              </div>{" "}
            </NavLink>
          </div>{" "}
      </aside>
    </>
  );
}
