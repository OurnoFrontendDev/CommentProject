import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
