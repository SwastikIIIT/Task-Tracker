export const loginUser = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const signupUser = async (userData) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Task Actions
export const fetchTasks = async (token) => {
  const response = await fetch('/api/tasks', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const data = await response.json();
    return data.tasks;
  }
  throw new Error('Failed to fetch tasks');
};

export const createTask = async (token, taskData) => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  });
  return response.ok;
};

export const updateTaskStatus = async (token, taskId, status) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  return response.ok;
};

export const deleteTask = async (token, taskId) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.ok;
};

// Time Log Actions
export const fetchTimeLogs = async (token) => {
  const response = await fetch('/api/time-logs', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const data = await response.json();
    return data.timeLogs;
  }
  throw new Error('Failed to fetch time logs');
};

export const startTimer = async (token, taskId) => {
  const response = await fetch('/api/time-logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ taskId })
  });
  return response.ok;
};

export const stopTimer = async (token, logId) => {
  const response = await fetch(`/api/time-logs/${logId}/stop`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.ok;
};

// Summary Actions
export const fetchSummary = async (token) => {
  const response = await fetch('/api/summary', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const data = await response.json();
    return data.summary;
  }
  throw new Error('Failed to fetch summary');
};