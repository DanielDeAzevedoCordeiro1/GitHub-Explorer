import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { UserContextType } from '../types';

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
