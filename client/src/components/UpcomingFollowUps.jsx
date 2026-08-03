
import { useEffect, useState } from "react";
import api from "../services/api";

function UpcomingFollowUps() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const res = await api.get("/leads/followups");
        setLeads(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFollowUps();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        📅 Upcoming Follow-ups
      </h2>

      {leads.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          No upcoming follow-ups.
        </p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <h3 className="font-semibold text-lg">
                {lead.name}
              </h3>

              <p className="text-gray-600">
                {lead.company}
              </p>

              <p className="text-blue-600">
                📅{" "}
                {new Date(
                  lead.followUpDate
                ).toLocaleDateString()}
              </p>

              <p className="text-gray-700 mt-2">
                {lead.notes || "No notes"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingFollowUps;