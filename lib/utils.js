// lib/utils.js

// Time formatting utility
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Calculate total time for a specific task
export const getTaskTotalTime = (timeLogs, taskId) => {
  return timeLogs
    .filter(log => log.taskId === taskId && log.duration)
    .reduce((total, log) => total + (log.duration || 0), 0);
};

// Find active time log
export const findActiveTimeLog = (timeLogs) => {
  return timeLogs.find(log => !log.endTime) || null;
};

// Local storage helpers
export const getStoredToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
};

export const getStoredUser = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const storeAuthData = (token, user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};