import { useAuthStore } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";
import { refineTask } from "@/lib/actions";
import { useState } from "react";

export default function TaskForm() {
  const { token } = useAuthStore();
  const { newTask, updateNewTask, createTask } = useTaskStore();
  const [loadingAI, setLoadingAI] = useState(false);
  const [error, setError] = useState("");

  const handleAIRefine = async () => {
    if (!newTask.title.trim()) {
      setError("⚠️ Please enter a task title before using AI Suggest.");
      return;
    }

    setError(""); 
    setLoadingAI(true);
    const suggestion = await refineTask(newTask.title);
    setLoadingAI(false);

    console.log(suggestion);

    if (suggestion) {
      updateNewTask("title", suggestion.title);
      updateNewTask("description", suggestion.description);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    await createTask(token);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task title (e.g., follow up with designer)"
          value={newTask.title}
          onChange={(e) => updateNewTask("title", e.target.value)}
          className="p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTask.description}
          onChange={(e) => updateNewTask("description", e.target.value)}
          className="p-3 border rounded-lg"
        />

        
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAIRefine}
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            disabled={loadingAI}
          >
            {loadingAI ? "Refining..." : "✨ AI Suggest"}
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
