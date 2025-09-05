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
import { useRouter } from 'next/navigation';

const HomeComponent = () => {
  const { user, initializeAuth } = useAuthStore();
  const { loadAllData, clearAllData } = useTaskStore();
  const router=useRouter();

  useEffect(() => {
    const hasAuth = initializeAuth();
    if(!hasAuth)
    {
         router.push('/login');
    }
    else
    {
      const token = useAuthStore.getState().token;
      loadAllData(token);
    }
  }, []);


  useEffect(() => {
    if (!user) {
      clearAllData();
    }
  }, [user]);

  if(!user)
  {
     return(
        <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 font-medium animate-pulse">Loading...</p>
      </div>
     )
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