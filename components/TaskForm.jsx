import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";


export default function TaskForm() {
  const { token } = useAuthStore();
  const { newTask, updateNewTask, createTask } = useTaskStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    await createTask(token);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={onSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="Task title (e.g., follow up with designer)"
          value={newTask.title}
          onChange={(e) => updateNewTask('title', e.target.value)}
          className="flex-1 p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTask.description}
          onChange={(e) => updateNewTask('description', e.target.value)}
          className="flex-1 p-3 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}