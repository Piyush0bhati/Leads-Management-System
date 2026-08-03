import {
  FaEye,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";

function LeadTable({ leads, onEdit, onDelete, onView }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-green-100 text-green-700";

      case "Contacted":
        return "bg-blue-100 text-blue-700";

      case "Qualified":
        return "bg-purple-100 text-purple-700";

      case "Lost":
        return "bg-red-100 text-red-700";

      case "Converted":
        return "bg-emerald-100 text-emerald-700";

      default:
        return "bg-gray-100 dark:bg-slate-900 text-gray-700";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg">

      <table className="w-full">

        <thead className="bg-gray-100 dark:bg-slate-900 dark:bg-slate-700">

          <tr className="hover:bg-blue-50 dark:hover:bg-slate-700 transition">

            <th className="px-6 py-4 text-left">Lead</th>

            <th className="px-6 py-4 text-left">Company</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-left">Created</th>

            <th className="px-6 py-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-b hover:bg-blue-50 transition-all duration-300"
            >

              {/* Lead */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <FaUserCircle className="text-4xl text-blue-500" />

                  <div>

                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {lead.name}
                    </h3>

                    <p className="flex items-center gap-2 text-gray-500 dark:text-gray-300 text-sm">
                      <FaEnvelope />
                      {lead.email}
                    </p>

                  </div>

                </div>

              </td>

              {/* Company */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-2 text-gray-700">

                  <FaBuilding className="text-blue-500" />

                  {lead.company}

                </div>

              </td>

              {/* Status */}

              <td className="px-6 py-5">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>

              </td>

              {/* Created */}

              <td className="px-6 py-5 text-gray-600">

                {new Date(lead.createdAt).toLocaleDateString()}

              </td>

              {/* Actions */}

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onView(lead)}
                    className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    title="View"
                  >
                    <FaEye className="mx-auto" />
                  </button>

                  <button
                    onClick={() => onEdit(lead)}
                    className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition"
                    title="Edit"
                  >
                    <FaEdit className="mx-auto" />
                  </button>

                  <button
                    onClick={() => onDelete(lead._id)}
                    className="w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                    title="Delete"
                  >
                    <FaTrash className="mx-auto" />
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {leads.length === 0 && (
        <div className="py-16 text-center">

          <div className="text-6xl mb-4">📭</div>

          <h2 className="text-2xl font-bold text-gray-700">
            No Leads Found
          </h2>

          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Start by adding your first lead.
          </p>

        </div>
      )}

    </div>
  );
}

export default LeadTable;