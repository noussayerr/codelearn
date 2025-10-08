"use client"

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { hydrateFromStorage } from '@/store/slices/authSlice';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(hydrateFromStorage());
  }, []);
  return <Provider store={store}>{children}</Provider>;
}



