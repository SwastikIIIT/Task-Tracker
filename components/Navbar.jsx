'use client'

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router=useRouter();

  const handleLogout=()=>{
      logout();
      router.push('/login');
   
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}