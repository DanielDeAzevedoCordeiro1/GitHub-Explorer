export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  watchers_count: number;
  default_branch: string;
  topics: string[];
  visibility: string;
  owner: {
    login: string;
  };
}

export type SortOption = 'stars-desc' | 'stars-asc' | 'name-asc' | 'name-desc' | 'updated-desc' | 'updated-asc';

export interface UserContextType {
  currentUser: GitHubUser | null;
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
  searchUser: (username: string) => Promise<boolean>;
  sortRepositories: (sortBy: SortOption) => void;
  clearError: () => void;
}

export interface ApiError {
  message: string;
  status?: number;
}
