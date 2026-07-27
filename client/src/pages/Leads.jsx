import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import ExportButton from "../components/ExportButton";
import LeadDetailsModal from "../components/LeadDetailsModal";


import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LeadTable from "../components/LeadTable";
import AddLead from "../components/AddLead";
import DeleteModal from "../components/DeleteModal";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [viewLead, setViewLead] = useState(null);

  const fileInputRef = useRef(null);

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const res = await api.get(
        `/leads?page=${page}&limit=5&search=${search}&status=${status}`
      );

      setLeads(res.data.leads);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status]);

  // Open Delete Modal
  const deleteLead = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    try {
      await api.delete(`/leads/${deleteId}`);

      toast.success("Lead Deleted Successfully!");

      setShowDeleteModal(false);
      setDeleteId(null);

      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleViewLead = (lead) => {
    setViewLead(lead);
    setShowDetailsModal(true);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/leads/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);

      fetchLeads();

      fileInputRef.current.value = "";
    } catch (error) {
      toast.error(error.response?.data?.message || "Import Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          <AddLead
            onLeadAdded={fetchLeads}
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
          />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Leads
            </h1>

            <ExportButton leads={leads} />
          </div>

          <div className="flex gap-3 mb-4">

            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              📥 Import Excel
            </button>

            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              onChange={handleImport}
              hidden
            />

          </div>

          {/* Search + Filter */}

          <div className="flex flex-col md:flex-row gap-4 mb-6">

            <input
              type="text"
              placeholder="Search by name, email or company..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="border p-3 rounded w-full md:w-80"
            />

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="border p-3 rounded"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
              <option value="Converted">Converted</option>
            </select>

          </div>

          {/* Lead Table */}

          <LeadTable
            leads={leads}
            onEdit={setSelectedLead}
            onDelete={deleteLead}
            onView={handleViewLead}
          />

          {/* Pagination */}

          <div className="flex justify-center items-center gap-4 mt-6">

            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-gray-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Next
            </button>

          </div>

        </div>
      </div>

      {/* Delete Modal */}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      <LeadDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        lead={viewLead}
      />

    </div>
  );
}

export default Leads;