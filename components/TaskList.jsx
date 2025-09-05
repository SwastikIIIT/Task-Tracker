import { formatTime, getTaskTotalTime } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { token } = useAuthStore();
  const { tasks, timeLogs, activeTimeLog, updateTaskStatus, startTimer, stopTimer, deleteTask } = useTaskStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Your Tasks</h2>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks yet. Create your first task above!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              // activeTimeLog={activeTimeLog}
              // formatTime={formatTime}
              // getTaskTotalTime={(taskId) => getTaskTotalTime(timeLogs, taskId)}
              // onUpdateStatus={(taskId, status) => updateTaskStatus(token, taskId, status)}
              // onStartTimer={(taskId) => startTimer(token, taskId)}
              // onStopTimer={(logId) => stopTimer(token, logId)}
              // onDeleteTask={(taskId) => deleteTask(token, taskId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}