import { FaBell } from "react-icons/fa";

function NotificationDropdown() {
  const notifications = [
    {
      id: 1,
      title: "Rahul's follow-up is today",
      time: "10 min ago",
    },
    {
      id: 2,
      title: "New lead added",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Priya converted successfully",
      time: "Yesterday",
    },
  ];

  return (
    <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border z-50">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <FaBell />
          Notifications
        </h2>
      </div>

      {notifications.map((item) => (
        <div
          key={item.id}
          className="px-4 py-3 hover:bg-gray-100 dark:bg-slate-900 cursor-pointer border-b"
        >
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{item.time}</p>
        </div>
      ))}

      <div className="p-3 text-center text-blue-600 font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
        View All
      </div>
    </div>
  );
}

export default NotificationDropdown;