'use client'
import React, { useEffect } from 'react'
import { useTaskStore } from '@/stores/taskStore';
import { useAuthStore } from '@/stores/authStore';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import DailySummary from '@/components/DailySummary';
import TaskForm from '@/components/TaskForm';
import ActiveTimer from '@/components/ActiveTimer';
import TaskList from '@/components/TaskList';


export default function Home() {
   const { user, initializeAuth } = useAuthStore();
     const { loadAllData, clearAllData } = useTaskStore();
   
   
     useEffect(() => {
       const hasAuth = initializeAuth();
       if (hasAuth) {
         const token = useAuthStore.getState().token;
         loadAllData(token);
       }
     }, [initializeAuth, loadAllData]);
   
   
     useEffect(() => {
       if (!user) {
         clearAllData();
       }
     }, [user, clearAllData]);
   
   
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