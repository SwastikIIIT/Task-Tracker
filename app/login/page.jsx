'use client'
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const { user, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const hasAuth = initializeAuth();

    if (hasAuth || user) {
      router.push("/"); 
    }
  }, [router]);

  if(user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 font-medium animate-pulse">Loading...</p>
      </div>
    );
  }
  
  return <AuthForm />;
}
