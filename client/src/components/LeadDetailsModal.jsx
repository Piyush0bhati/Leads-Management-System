import {
  FaTimes,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaCalendarAlt,
  FaStickyNote,
  FaClipboardCheck,
} from "react-icons/fa";

function LeadDetailsModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-800 dark:to-slate-900 text-white p-8 relative">

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-2xl hover:rotate-90 transition"
          >
            <FaTimes />
          </button>

          <div className="flex items-center gap-5">

            <FaUserCircle className="text-7xl" />

            <div>

              <h2 className="text-3xl font-bold">
                {lead.name}
              </h2>

              <p className="text-blue-100 mt-1">
                {lead.company}
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2 mb-2">
                <FaEnvelope />
                Email
              </p>

              <p className="font-semibold break-all">
                {lead.email}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2 mb-2">
                <FaPhone />
                Phone
              </p>

              <p className="font-semibold">
                {lead.phone}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2 mb-2">
                <FaBuilding />
                Company
              </p>

              <p className="font-semibold">
                {lead.company}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2 mb-2">
                <FaClipboardCheck />
                Status
              </p>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">
              <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2 mb-2">
                <FaCalendarAlt />
                Follow-up Date
              </p>

              <p className="font-semibold">
                {lead.followUpDate
                  ? new Date(lead.followUpDate).toLocaleDateString()
                  : "No Follow-up Scheduled"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">
              <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2 mb-2">
                <FaStickyNote />
                Notes
              </p>

              <p className="leading-7 text-gray-700">
                {lead.notes || "No notes available for this lead."}
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default LeadDetailsModal;