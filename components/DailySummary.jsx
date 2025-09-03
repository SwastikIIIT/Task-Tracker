import { formatTime } from "@/lib/utils";
import { useTaskStore } from "@/stores/taskStore";


export default function DailySummary() {
  const { summary } = useTaskStore();

  if (!summary) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Time Tracked</p>
          <p className="text-2xl font-bold text-blue-800">
            {formatTime(summary.totalTimeTracked)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Completed</p>
          <p className="text-2xl font-bold text-green-800">{summary.completedTasks}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">In Progress</p>
          <p className="text-2xl font-bold text-yellow-800">{summary.inProgressTasks}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-gray-800">{summary.pendingTasks}</p>
        </div>
      </div>
    </div>
  );
}