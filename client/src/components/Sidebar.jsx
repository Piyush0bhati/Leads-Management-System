import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // if you store user data
    sessionStorage.clear();

    navigate("/", { replace: true });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Leads",
      path: "/leads",
      icon: <FaUsers />,
    },
    {
      name: "Analytics",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="bg-white dark:bg-slate-800 border-r dark:border-slate-700">

      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-700">
          Navigation
        </h2>
      </div>

      <nav className="flex-1 mt-6 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-3 transition-all duration-300 ${isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;