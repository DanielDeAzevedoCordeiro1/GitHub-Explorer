import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, GitFork, AlertCircle, Eye } from 'lucide-react';
import { GitHubRepository } from '../types';
import githubService from '../services/github';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const RepositoryDetails: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<GitHubRepository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      if (!owner || !repo) return;
      try {
        const data = await githubService.getRepository(owner, repo);
        setRepository(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar repositório');
      } finally {
        setLoading(false);
      }
    };
    fetchRepository();
  }, [owner, repo]);

  if (loading) {
    return <Loading message="Carregando repositório..." />;
  }

  if (error || !repository) {
    return (
      <div className="min-h-screen bg-sky-950 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 px-3 py-2 bg-sky-950 text-white rounded hover:bg-sky-900"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
          {error && <ErrorMessage message={error} />}
          {!error && <ErrorMessage message="Repositório não encontrado" />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-950 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 px-3 py-2 bg-sky-950 text-white rounded hover:bg-sky-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="bg-sky-900 rounded shadow p-6">
          <h1 className="text-2xl font-bold text-white mb-2">{repository.name}</h1>
          <p className="text-gray-400 text-sm mb-4">{repository.full_name}</p>

          {repository.description && (
            <p className="text-gray-200 mb-6">{repository.description}</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-sky-900 p-4 rounded">
              <div className="flex items-center gap-1 text-sky-400 text-sm mb-1">
                <Star size={16} />
                Estrelas
              </div>
              <p className="text-xl font-bold text-white">{repository.stargazers_count}</p>
            </div>
            <div className="bg-sky-900 p-4 rounded">
              <div className="flex items-center gap-1 text-sky-400 text-sm mb-1">
                <GitFork size={16} />
                Forks
              </div>
              <p className="text-xl font-bold text-white">{repository.forks_count}</p>
            </div>
            <div className="bg-sky-900 p-4 rounded">
              <div className="flex items-center gap-1 text-sky-400 text-sm mb-1">
                <AlertCircle size={16} />
                Issues
              </div>
              <p className="text-xl font-bold text-white">{repository.open_issues_count}</p>
            </div>
            <div className="bg-sky-900 p-4 rounded">
              <div className="flex items-center gap-1 text-sky-400 text-sm mb-1">
                <Eye size={16} />
                Watchers
              </div>
              <p className="text-xl font-bold text-white">{repository.watchers_count}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm mb-6 text-gray-200">
            {repository.language && (
              <p><strong>Linguagem:</strong> {repository.language}</p>
            )}
            <p><strong>Visibilidade:</strong> {repository.visibility}</p>
            <p><strong>Branch:</strong> {repository.default_branch}</p>
          </div>

          {repository.topics && repository.topics.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {repository.topics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-sky-700 text-white px-2 py-1 rounded text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-600"
          >
            Ver no GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetails;
