'use client'
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";


export default function AuthForm() {
  const { 
    authMode, 
    authForm, 
    loading, 
    error,
    setAuthMode,
    updateAuthForm,
    handleAuth
  } = useAuthStore();

  const router=useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result=await handleAuth();
    
    if(result.success && result.user)
    router.push('/');

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <input
              type="text"
              placeholder="Name"
              value={authForm.name}
              onChange={(e) => updateAuthForm('name', e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={authForm.email}
            onChange={(e) => updateAuthForm('email', e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={authForm.password}
            onChange={(e) => updateAuthForm('password', e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : authMode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4">
          {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-blue-600 hover:underline"
          >
            {authMode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
