function LeadDetailsModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-semibold">{lead.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">{lead.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-semibold">{lead.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Company</p>
            <p className="font-semibold">{lead.company}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>

            <span
              className={`px-3 py-1 rounded-full text-white
              ${
                lead.status === "New"
                  ? "bg-green-500"
                  : lead.status === "Contacted"
                  ? "bg-blue-500"
                  : lead.status === "Qualified"
                  ? "bg-purple-500"
                  : lead.status === "Lost"
                  ? "bg-red-500"
                  : "bg-emerald-500"
              }`}
            >
              {lead.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500">Follow-up Date</p>

            <p className="font-semibold">
              {lead.followUpDate
                ? new Date(lead.followUpDate).toLocaleDateString()
                : "Not Set"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Notes</p>

            <p className="bg-gray-100 p-3 rounded">
              {lead.notes || "No Notes Available"}
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default LeadDetailsModal;