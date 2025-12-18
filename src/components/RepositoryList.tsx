import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, GitFork, Circle, ExternalLink, ArrowUpDown } from 'lucide-react';
import { GitHubRepository, SortOption } from '../types';
import { formatDate, getLanguageColor } from '../utils/formatters';

interface RepositoryListProps {
  repositories: GitHubRepository[];
  onSort: (sortBy: SortOption) => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, onSort }) => {
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState<SortOption>('stars-desc');

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const sortBy = e.target.value as SortOption;
    setCurrentSort(sortBy);
    onSort(sortBy);
  };

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">Nenhum repositório público encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-sky-900 rounded-lg shadow p-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown size={18} className="text-gray-200" />
          <span className="text-sm font-medium text-gray-100">Ordenar por:</span>
        </div>
        <select
          value={currentSort}
          onChange={handleSort}
          className="px-3 py-1.5 border border-sky-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-sky-950 text-white"
        >
          <option value="stars-desc">Estrelas (maior)</option>
          <option value="stars-asc">Estrelas (menor)</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="updated-desc">Atualização (recente)</option>
          <option value="updated-asc">Atualização (antiga)</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            onClick={() => navigate(`/repository/${repo.owner.login}/${repo.name}`)}
            className="bg-sky-900 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-5 border-2 border-transparent hover:border-sky-400"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-white hover:text-sky-400 flex-1">
                {repo.name}
              </h3>
              <ExternalLink size={16} className="text-gray-400 ml-2 flex-shrink-0" />
            </div>

            {repo.description && (
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <Circle
                    size={12}
                    className={`${getLanguageColor(repo.language)} rounded-full`}
                    fill="currentColor"
                  />
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star size={14} />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork size={14} />
                <span>{repo.forks_count}</span>
              </div>
              <span className="text-xs">
                {formatDate(repo.updated_at)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-400 mt-4">
        Total: {repositories.length} repositório{repositories.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default RepositoryList;
