import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useTaskStore } from "../stores/taskStore";
import { formatTime, getTaskTotalTime } from "../lib/utils";

export default function TaskItem({ task }) {
  const { token } = useAuthStore();
  const { 
    timeLogs, 
    activeTimeLog, 
    updateTaskStatus, 
    startTimer, 
    stopTimer, 
    deleteTask,
    editTask
  } = useTaskStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || ""
  });

  const handleUpdateStatus = (status) => {
    updateTaskStatus(token, task.id, status);
  };

  const handleStartTimer = () => startTimer(token, task.id);
  const handleStopTimer = () => stopTimer(token, activeTimeLog.id);
  const handleDeleteTask = () => deleteTask(token, task.id);

  const handleSave = async () => {
    const success = await editTask(token, task.id, formData);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border rounded px-2 py-1 w-full mb-2"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border rounded px-2 py-1 w-full"
              />
            </>
          ) : (
            <>
              <h3 className="font-medium text-lg">{task.title}</h3>
              {task.description && (
                <p className="text-gray-600 mt-1">{task.description}</p>
              )}
            </>
          )}

          <div className="flex items-center gap-4 mt-3">
            <select
              value={task.status}
              onChange={(e) => handleUpdateStatus(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
              disabled={isEditing}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <span className="text-sm text-gray-500">
              Total time: {formatTime(getTaskTotalTime(timeLogs, task.id))}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
            </>
          ) : activeTimeLog?.taskId === task.id ? (
            <button
              onClick={handleStopTimer}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              Stop
            </button>
          ) : (
            <>
              <button
                onClick={handleStartTimer}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              >
                Start
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteTask}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
              >
                Delete
              </button>
            </>
          )}
          
        </div>
      </div>

      {task.timeLogs && task.timeLogs.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Time Logs:</h4>
          <div className="space-y-1">
            {task.timeLogs.map((log) => (
              <div key={log.id} className="text-xs text-gray-600 flex justify-between">
                <span>
                  {new Date(log.startTime).toLocaleString()} -{" "}
                  {log.endTime ? new Date(log.endTime).toLocaleString() : "Active"}
                </span>
                <span>
                  {log.duration ? formatTime(log.duration) : "Running..."}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
