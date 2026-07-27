function LeadTable({ leads, onEdit, onDelete, onView }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Company</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-center">Actions</th>
            <th className="border px-4 py-2">Created</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.email}</td>
              <td className="border px-4 py-2">{lead.company}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold
                    ${lead.status === "New"
                      ? "bg-green-500"
                      : lead.status === "Contacted"
                        ? "bg-blue-500"
                        : lead.status === "Qualified"
                          ? "bg-purple-500"
                          : lead.status === "Lost"
                            ? "bg-red-500"
                            : "bg-emerald-600"
                    }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="p-3">
                <div className="flex gap-2 justify-center">

                  <button
                    onClick={() => onView(lead)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() => onEdit(lead)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => onDelete(lead._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>

                </div>
              </td>
              <td className="border px-4 py-2">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;