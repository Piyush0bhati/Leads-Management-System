import { FaExclamationTriangle, FaTimes, FaTrash } from "react-icons/fa";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      {/* Modal */}
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Delete Lead
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Confirmation required
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl transition"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}
        <div className="p-6">

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Are you sure you want to delete this lead?
          </p>

          <p className="text-sm text-red-500 mt-2">
            This action cannot be undone.
          </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 bg-gray-50 dark:bg-slate-900/50">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-medium transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
          >
            <FaTrash />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;