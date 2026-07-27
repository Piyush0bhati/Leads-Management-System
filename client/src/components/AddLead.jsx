import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

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
  });

  // Fill the form when Edit button is clicked
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedLead) {
        // Update existing lead
        await api.put(`/leads/${selectedLead._id}`, formData);

        toast.success("Lead Updated Successfully!");
      } else {
        // Create new lead
        await api.post("/leads", formData);

        toast.success("Lead Added Successfully!");
      }

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
        notes:"",
        followUpDate:"",
      });

      // Exit edit mode
      setSelectedLead(null);

      // Refresh lead list
      onLeadAdded();

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-6"
    >
      <h2 className="text-2xl font-bold mb-4">
        {selectedLead ? "Edit Lead" : "Add New Lead"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
          <option value="Converted">Converted</option>
        </select>

      </div>

      <div className="mt-4 flex gap-3">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {selectedLead ? "Update Lead" : "Save Lead"}
        </button>

        {selectedLead && (
          <button
            type="button"
            onClick={() => {
              setSelectedLead(null);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                status: "New",
                notes:"",
                followUpDate:"",
              });
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}

        <input
          type="date"
          name="followUpDate"
          value={formData.followUpDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="notes"
          rows="4"
          placeholder="Lead Notes..."
          value={formData.notes}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

      </div>
    </form>
  );
}

export default AddLead;