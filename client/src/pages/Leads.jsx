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
    if (!deleteId) {
      toast.error("Invalid lead ID");
      return;
    }

    try {
      console.log("Deleting lead:", deleteId);

      await api.delete(`/leads/${deleteId}`);

      toast.success("Lead deleted successfully!");

      setShowDeleteModal(false);
      setDeleteId(null);

      // Update UI immediately
      setLeads((prevLeads) =>
        prevLeads.filter((lead) => lead._id !== deleteId)
      );

      // If current page becomes empty, go back one page
      if (leads.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchLeads();
      }

    } catch (error) {
      console.error("Delete error:", error);

      toast.error(
        error.response?.data?.message || "Delete failed"
      );
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          <AddLead
            onLeadAdded={fetchLeads}
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
          />

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 mb-8">

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">

              <div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                  👥 Lead Management
                </h1>

                <p className="text-gray-500 dark:text-gray-300 mt-2">
                  Manage customer leads, track progress and boost conversions.
                </p>
              </div>

              <ExportButton leads={leads} />

            </div>

          </div>

          <div className="flex flex-wrap gap-4 mb-8">

            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
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

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">

            <div className="relative w-full md:w-96">

              <input
                type="text"
                placeholder="🔍 Search by name, company or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 p-3 rounded"
              />



              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="border border-gray-200 dark:border-slate-700 rounded-xl px-5 py-3"
              >
                <option value="">All Status</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Lost</option>
                <option>Converted</option>
              </select>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-gray-500 dark:text-gray-300">Showing</p>
                <h2 className="text-2xl font-bold">
                  {leads.length}
                </h2>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-gray-500 dark:text-gray-300">Current Page</p>
                <h2 className="text-2xl font-bold">
                  {page}
                </h2>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-gray-500 dark:text-gray-300">Pages</p>
                <h2 className="text-2xl font-bold">
                  {totalPages}
                </h2>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-gray-500 dark:text-gray-300">Status</p>
                <h2 className="text-lg font-bold">
                  {status || "All"}
                </h2>
              </div>

            </div>

          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Lead Directory</h2>
              <p className="text-gray-500 dark:text-gray-300">
                Manage all your customer leads in one place.
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-300">Total Leads</p>
              <p className="text-3xl font-bold text-blue-600">
                {leads.length}
              </p>
            </div>
          </div>

          {/* Lead Table */}

          {leads.length === 0 ? (
            <div className="flex flex-col items-center py-20">

              <div className="text-8xl">
                📂
              </div>

              <h2 className="text-3xl font-bold mt-5">
                No Leads Found
              </h2>

              <p className="text-gray-500 dark:text-gray-300 mt-3">
                Try changing filters or create a new lead.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setStatus("");
                }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                Clear Filters
              </button>
            </div>

          ) : (

            <LeadTable
              leads={leads}
              onEdit={setSelectedLead}
              onDelete={deleteLead}
              onView={handleViewLead}
            />
          )}

          {/* Pagination */}

          <div className="flex justify-center items-center gap-4 mt-6">

            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-gray-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              ⬅ Previous
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
              Next ➜
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