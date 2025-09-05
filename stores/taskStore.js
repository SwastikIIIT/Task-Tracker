import { create } from 'zustand';
import { 
  fetchTasks, 
  createTask, 
  updateTaskStatus, 
  deleteTask, 
  fetchTimeLogs, 
  startTimer, 
  stopTimer, 
  fetchSummary,
  updateTask, 
} from '@/lib/actions';
import { findActiveTimeLog } from '@/lib/utils';

export const useTaskStore = create((set, get) => ({
  // State
  tasks: [],
  timeLogs: [],
  summary: null,
  activeTimeLog: null,
  newTask: { title: '', description: '' },
  loading: false,
  error: '',

  // Actions
  updateNewTask: (field, value) => set((state) => ({
    newTask: { ...state.newTask, [field]: value }
  })),

  loadAllData: async (token) => {
    if (!token) return;
    
    set({ loading: true, error: '' });
    try {
      const [tasksData, timeLogsData, summaryData] = await Promise.all([
        fetchTasks(token),
        fetchTimeLogs(token),
        fetchSummary(token)
      ]);
      
      set({ 
        tasks: tasksData,
        timeLogs: timeLogsData,
        summary: summaryData,
        activeTimeLog: findActiveTimeLog(timeLogsData),
        loading: false
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ error: 'Failed to load data', loading: false });
    }
  },

  createTask: async (token) => {
    const { newTask } = get();
   
    try
    {
        const success = await createTask(token, newTask);
        if (success) {
          set({ newTask: { title: '', description: '' } });
          get().loadAllData(token);
          return true;
        }
    }
    catch(error)
    {
        console.error('Error creating task:', error);
    }
    return false;
  },
 
  editTask: async (token, taskId, taskData) => {
  try {
    const success = await updateTask(token, taskId, taskData);
    if (success) {
      get().loadAllData(token); // reload tasks with fresh data
      return true;
    }
  } catch (error) {
    console.error("Error editing task:", error);
  }
  return false;
},

  updateTaskStatus: async (token, taskId, status) => {
    try {
      const success = await updateTaskStatus(token, taskId, status);
      if (success) {
        get().loadAllData(token);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  deleteTask: async (token, taskId) => {
    try {
      const success = await deleteTask(token, taskId);
      if (success) {
        get().loadAllData(token);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },

  startTimer: async (token, taskId) => {
    try {
      const success = await startTimer(token, taskId);
      if (success) {
        const newTimeLogs = await fetchTimeLogs(token);
        set({ 
          timeLogs: newTimeLogs,
          activeTimeLog: findActiveTimeLog(newTimeLogs)
        });
      }
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  },

  stopTimer: async (token, logId) => {
    try {
      const success = await stopTimer(token, logId);
      if (success) {
        get().loadAllData(token);
      }
    } catch (error) {
      console.error('Error stopping timer:', error);
    }
  },

  clearAllData: () => set({
    tasks: [],
    timeLogs: [],
    summary: null,
    activeTimeLog: null,
    editingTask: null,
    editTaskData: { title: '', description: '' },
    newTask: { title: '', description: '' },
    loading: false,
    error: ''
  })
}));