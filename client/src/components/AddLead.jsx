import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaClipboardList,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";

function AddLead({
  onLeadAdded,
  selectedLead,
  setSelectedLead,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
    followUpDate: "",
  });

  useEffect(() => {
    if (selectedLead) {
      setFormData({
        name: selectedLead.name,
        email: selectedLead.email,
        phone: selectedLead.phone,
        company: selectedLead.company,
        status: selectedLead.status,
        notes: selectedLead.notes || "",
        followUpDate: selectedLead.followUpDate
          ? selectedLead.followUpDate.substring(0, 10)
          : "",
      });
    }
  }, [selectedLead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "New",
      notes: "",
      followUpDate: "",
    });

    setSelectedLead(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedLead) {
        await api.put(`/leads/${selectedLead._id}`, formData);
        toast.success("Lead Updated Successfully!");
      } else {
        await api.post("/leads", formData);
        toast.success("Lead Added Successfully!");
      }

      clearForm();
      onLeadAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-800  dark:text-white mb-2">
        {selectedLead ? "✏ Edit Lead" : "➕ Add New Lead"}
      </h2>

      <p className="text-gray-500 dark:text-gray-300 mb-8">
        Fill in the customer information below.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaUser /> Name
            </label>
            <input
              className={inputClass}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              className={inputClass}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaPhone /> Phone
            </label>
            <input
              className={inputClass}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaBuilding /> Company
            </label>
            <input
              className={inputClass}
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaClipboardList /> Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
              <option>Converted</option>
            </select>
          </div>

          <div>
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaCalendarAlt /> Follow-up Date
            </label>

            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium flex items-center gap-2 mb-2">
              <FaStickyNote /> Notes
            </label>

            <textarea
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              placeholder="Write lead notes..."
            />
          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
          >
            {selectedLead ? "Update Lead" : "Save Lead"}
          </button>

          {selectedLead && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl transition"
            >
              Cancel
            </button>
          )}

        </div>
      </form>
    </div>
  );
}

export default AddLead;