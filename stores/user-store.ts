/* eslint-disable no-unused-vars */
import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// State và Actions
type State = {
  jwt: string | null;
  user: User | null;
};

type Actions = {
  clear: () => void;
  isAuthenticated: () => boolean;
  setUserInfo: (user: User) => void;
  setAuth: (user: User, jwt: string) => void;
};

// Default value for state
const defaultStates: State = {
  jwt: null,
  user: null,
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
    }),
    { name: 'user-doan-storage' }
  )
);
