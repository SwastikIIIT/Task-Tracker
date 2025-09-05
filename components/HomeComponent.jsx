'use client'
import React, { useEffect } from 'react'
import DailySummary from './DailySummary';
import TaskForm from './TaskForm';
import ActiveTimer from './ActiveTimer';
import TaskList from './TaskList';
import Navbar from './Navbar';
import AuthForm from './AuthForm';
import { useTaskStore } from '@/stores/taskStore';
import { useAuthStore } from '@/stores/authStore';

const HomeComponent = () => {
  const { user, initializeAuth } = useAuthStore();
  const { loadAllData, clearAllData } = useTaskStore();


  useEffect(() => {
    const hasAuth = initializeAuth();
    if (hasAuth)
    {
      const token = useAuthStore.getState().token;
      loadAllData(token);
    }
  }, []);


  useEffect(() => {
    if (!user) {
      clearAllData();
    }
  }, []);


  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DailySummary />
        <TaskForm />
        <ActiveTimer />
        <TaskList />
      </div>
    </div>
  );
}

export default HomeComponent