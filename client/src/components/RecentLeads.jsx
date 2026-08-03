import { useEffect, useState } from "react";
import api from "../services/api";

function RecentLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await api.get("/leads/recent");
        setLeads(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-5">
        Recent Leads
      </h2>

      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Company</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.company}</td>
              <td className="p-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentLeads;