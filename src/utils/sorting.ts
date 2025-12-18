import { GitHubRepository, SortOption } from '../types';

export const sortRepositories = (repositories: GitHubRepository[], sortBy: SortOption): GitHubRepository[] => {
  const sorted = [...repositories];

  switch (sortBy) {
    case 'stars-desc':
      sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
      break;
    case 'stars-asc':
      sorted.sort((a, b) => a.stargazers_count - b.stargazers_count);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'updated-desc':
      sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      break;
    case 'updated-asc':
      sorted.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
      break;
  }

  return sorted;
};
