import { create } from 'zustand';
import { loginUser, signupUser } from '@/lib/actions';
import {  storeAuthData,clearAuthData, getStoredUser, getStoredToken } from '@/lib/utils';

export const useAuthStore = create((set,get) => ({
  // State
  user: null,
  token: null,
  authMode: 'login',
  authForm: { email: '', password: '', name: '' },
  loading: false,
  error: '',

  // Actions
  initializeAuth: () => {
    const token = getStoredToken();
    const user = getStoredUser();
    if (token && user) {
      set({ token, user });
      return true;
    }
    return false;
  },

  setAuthMode: (mode) => set({ authMode: mode, error: '' }),
  
  // setAuthForm: (form) => set({ authForm: form }),
  
  updateAuthForm: (field, value) => set((state) => ({
    authForm: { ...state.authForm, [field]: value }
  })),

  handleAuth: async () => {
    const { authMode, authForm } = get();
    set({ loading: true, error: '' });

    try {
        const authFunction = authMode === 'login' ? loginUser : signupUser;
        const data = await authFunction(authForm);

              if (authMode === 'login')
              {
                storeAuthData(data.token, data.user);
                set({ 
                  token: data.token, 
                  user: data.user, 
                  loading: false 
                });
                return { success: true, user: data.user };
              }
              else
              {
                set({ 
                  authMode: 'login', 
                  authForm: { email: '', password: '', name: '' },
                  loading: false 
                });
                return { success: true, signup: true };
              }
        }  
      catch (error)
      {
          set({error:'Authentication failed',loading: false });
          return { success: false };
      }
  },

  logout: () => {
    clearAuthData();
    set({ 
      user: null, 
      token: null, 
      authForm: { email: '', password: '', name: '' },
      error: '' 
    });
  },

  // clearError: () => set({ error: '' })
}));