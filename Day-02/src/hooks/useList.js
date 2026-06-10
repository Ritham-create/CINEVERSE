import { useContext } from 'react';
import { ListContext } from '../contexts/ListContext';

/**
 * useList — Custom hook for accessing the user's watchlist state.
 */
export function useList() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
}
