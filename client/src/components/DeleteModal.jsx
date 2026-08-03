import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaCalendarAlt,
  FaStickyNote,
  FaTimes,
} from "react-icons/fa";

function LeadDetailsModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  const statusColor = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Qualified: "bg-purple-100 text-purple-700",
    Lost: "bg-red-100 text-red-700",
    Converted: "bg-green-100 text-green-700",
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-800 dark:to-slate-900 text-white p-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">Lead Details</h2>
            <p className="text-blue-100 text-sm">
              Complete customer information
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl hover:rotate-90 duration-300"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          <Info
            icon={<FaUser className="text-blue-600" />}
            label="Name"
            value={lead.name}
          />

          <Info
            icon={<FaEnvelope className="text-pink-600" />}
            label="Email"
            value={lead.email}
          />

          <Info
            icon={<FaPhone className="text-green-600" />}
            label="Phone"
            value={lead.phone}
          />

          <Info
            icon={<FaBuilding className="text-purple-600" />}
            label="Company"
            value={lead.company}
          />

          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-orange-500" />
              <span className="font-medium">Follow-up</span>
            </div>

            <span className="font-semibold">
              {lead.followUpDate
                ? new Date(lead.followUpDate).toLocaleDateString()
                : "Not Set"}
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
            <span className="font-medium">Status</span>

            <span
              className={`px-4 py-2 rounded-full font-semibold ${
                statusColor[lead.status]
              }`}
            >
              {lead.status}
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-3">
              <FaStickyNote className="text-yellow-600" />
              <span className="font-semibold">Notes</span>
            </div>

            <p className="text-gray-600">
              {lead.notes || "No notes available."}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="p-6 border-t">

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">

      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>

      <span className="font-semibold text-gray-700">
        {value || "-"}
      </span>

    </div>
  );
}

export default LeadDetailsModal;