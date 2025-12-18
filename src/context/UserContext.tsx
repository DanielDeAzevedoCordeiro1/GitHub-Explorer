import React, { createContext, useState, ReactNode } from 'react';
import { GitHubUser, GitHubRepository, UserContextType, SortOption } from '../types';
import githubService from '../services/github';
import { sortRepositories as sortRepos } from '../utils/sorting';

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (username: string): Promise<boolean> => {
    if (!username.trim()) {
      setError('Por favor, digite um nome de usuário');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await githubService.getUser(username);
      const reposData = await githubService.getUserRepositories(username);
      const sortedRepos = sortRepos(reposData, 'stars-desc');

      setCurrentUser(userData);
      setRepositories(sortedRepos);
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar usuário');
      setCurrentUser(null);
      setRepositories([]);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sortRepositories = (sortBy: SortOption): void => {
    setRepositories(sortRepos(repositories, sortBy));
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: UserContextType = {
    currentUser,
    repositories,
    loading,
    error,
    searchUser,
    sortRepositories,
    clearError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
