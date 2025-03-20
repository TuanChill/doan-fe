/* eslint-disable no-unused-vars */
import { getMe } from '@/request/auth';
import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// State và Actions
type State = {
  jwt: string | null;
  user: User | null;
  redirectTo: string | null;
};

type Actions = {
  clear: () => void;
  isAuthenticated: () => boolean;
  setUserInfo: (user: User) => void;
  setAuth: (user: User, jwt: string) => void;
  reload: () => void;
  setRedirectTo: (redirectTo: string | null) => void;
};

// Default value for state
const defaultStates: State = {
  jwt: null,
  user: null,
  redirectTo: null,
};

// create store using zustands
export const useUserStore = create<State & Actions>()(
  persist(
    (set, getItem) => ({
      ...defaultStates,
      clear: () => {
        set(defaultStates);
      },
      setUserInfo: (user: User) => {
        set({ user });
      },
      setAuth: (user: User, jwt: string) => {
        set({ user, jwt });
      },
      isAuthenticated: () => {
        return !!getItem().jwt;
      },
      reload: async () => {
        try {
          const user = await getMe();
          set({ user });
        } catch (error) {
          console.error(error);
        }
      },
      setRedirectTo: (redirectTo: string | null) => {
        set({ redirectTo });
      },
    }),
    { name: 'user-doan-storage' }
  )
);

type SessionState = {
  sessionId: string | null;
};

type SessionActions = {
  setSessionId: (sessionId: string) => void;
};

export const useSessionStore = create<SessionState & SessionActions>()(
  persist(
    (set) => ({
      sessionId: null,
      setSessionId: (sessionId: string) => {
        set({ sessionId });
      },
    }),
    { name: 'session-doan-storage' }
  )
);
