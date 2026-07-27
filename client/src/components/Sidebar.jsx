import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">
        CRM
      </h2>

      <ul className="space-y-4">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/leads">Leads</Link>
        </li>

        <li>
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded w-full"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;