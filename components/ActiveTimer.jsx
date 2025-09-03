import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";


export default function ActiveTimer() {
  const { token } = useAuthStore();
  const { activeTimeLog, tasks, stopTimer } = useTaskStore();

  if (!activeTimeLog) return null;

  const task = tasks.find(task => task.id === activeTimeLog.taskId);

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-yellow-800 mb-4">Active Timer</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{task?.title || 'Unknown Task'}</p>
          <p className="text-sm text-yellow-700">
            Started: {new Date(activeTimeLog.startTime).toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={() => stopTimer(token, activeTimeLog.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Stop Timer
        </button>
      </div>
    </div>
  );
}