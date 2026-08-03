import CountUp from "react-countup";
import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-300 font-medium">{title}</p>

          <h2 className="text-4xl font-bold mt-3 text-gray-800 dark:text-white">
            {value}
          </h2>

          <p className="text-green-500 text-sm mt-2">
            Updated just now
          </p>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bg}`}
        >
          {Icon && <Icon className="text-3xl" />}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;