"use client"

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiFetch } from '@/lib/api';

export interface Workshop {
  _id: string;
  title: string;
  description: string;
  instructorId: string;
  level: string;
  price: string;
  language: string;
  category: string;
  rating: number;
  reviews: number;
  students: number;
  thumbnail?: string;
  tags: string[];
  modules: any[];
}

interface WorkshopsState {
  items: Workshop[];
  current: Workshop | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WorkshopsState = { items: [], current: null, status: 'idle', error: null };

export const fetchWorkshops = createAsyncThunk('workshops/fetchAll', async () => {
  return await apiFetch<Workshop[]>(`/workshops`);
});

export const fetchWorkshop = createAsyncThunk('workshops/fetchOne', async (id: string) => {
  return await apiFetch<Workshop>(`/workshops/${id}`);
});

const workshopsSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkshops.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWorkshops.fulfilled, (state, action: PayloadAction<Workshop[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load workshops';
      })
      .addCase(fetchWorkshop.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWorkshop.fulfilled, (state, action: PayloadAction<Workshop>) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchWorkshop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load workshop';
      });
  },
});

export default workshopsSlice.reducer;



