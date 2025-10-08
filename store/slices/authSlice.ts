"use client"

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

type User = { id: string; email: string; name: string; role: string };

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = { user: null, token: null, status: 'idle', error: null };

export const signup = createAsyncThunk('auth/signup', async (payload: { email: string; name: string; password: string }) => {
  return await apiFetch<{ accessToken: string; user: User }>(`/auth/signup`, { method: 'POST', body: payload });
});

export const login = createAsyncThunk('auth/login', async (payload: { email: string; password: string }) => {
  return await apiFetch<{ accessToken: string; user: User }>(`/auth/login`, { method: 'POST', body: payload });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
      }
    },
    hydrateFromStorage(state) {
      if (typeof window === 'undefined') return;
      try {
        const raw = localStorage.getItem('auth');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        state.user = parsed.user || null;
        state.token = parsed.token || null;
      } catch {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth', JSON.stringify({ token: state.token, user: state.user }));
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Signup failed';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth', JSON.stringify({ token: state.token, user: state.user }));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;



