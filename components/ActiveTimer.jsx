import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";
import { formatTime } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function ActiveTimer() {
  const { token } = useAuthStore();
  const { activeTimeLog, tasks, stopTimer } = useTaskStore();
  const [elapsed, setElapsed] = useState(0);

  // always call useEffect, just bail out if no activeTimeLog
  useEffect(() => {
    if (!activeTimeLog) return;

    const start = new Date(activeTimeLog.startTime).getTime();

    const updateElapsed = () => {
      const now = Date.now();
      setElapsed(Math.floor((now - start) / 1000));
    };

    updateElapsed(); // run immediately
    const interval = setInterval(updateElapsed, 1000);

    return () => clearInterval(interval);
  }, [activeTimeLog]);

  // if no active log, render nothing (AFTER hooks are called)
  if (!activeTimeLog) return null;

  const task = tasks.find((task) => task.id === activeTimeLog.taskId);

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-yellow-800 mb-4">Active Timer</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{task?.title || "Unknown Task"}</p>
          <p className="text-sm text-yellow-700">
            Started: {new Date(activeTimeLog.startTime).toLocaleTimeString()}
          </p>
          <div className="flex items-center text-lg font-bold text-yellow-900 mt-2 gap-2">
            <Clock size={20}/> 
            <p>{formatTime(elapsed)}</p>
          </div>
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
