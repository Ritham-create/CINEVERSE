import { createContext, useState, useCallback } from 'react';
import { myListDefault } from '../data/movies';

export const ListContext = createContext(null);

/**
 * ListProvider — Manages the user's "My List" (watchlist) state.
 * 
 * Demonstrates:
 * - Global state management with React Context
 * - State updates with functional setState
 * - Derived state (checking if a movie is in the list)
 */
export function ListProvider({ children }) {
  const [myList, setMyList] = useState(myListDefault);

  const addToList = useCallback((movie) => {
    setMyList(prev => {
      if (prev.some(m => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFromList = useCallback((movieId) => {
    setMyList(prev => prev.filter(m => m.id !== movieId));
  }, []);

  const isInList = useCallback((movieId) => {
    return myList.some(m => m.id === movieId);
  }, [myList]);

  const toggleList = useCallback((movie) => {
    setMyList(prev => {
      if (prev.some(m => m.id === movie.id)) {
        return prev.filter(m => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  }, []);

  const value = {
    myList,
    addToList,
    removeFromList,
    isInList,
    toggleList,
  };

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
}
