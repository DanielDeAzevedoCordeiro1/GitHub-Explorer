import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import UserCard from '../components/UserCard';
import RepositoryList from '../components/RepositoryList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { currentUser, repositories, loading, error, searchUser, sortRepositories } = useUser();

  useEffect(() => {
    if (username && (!currentUser || currentUser.login !== username)) {
      searchUser(username);
    }
  }, [username]);

  if (loading) {
    return <Loading message="Carregando perfil..." />;
  }

  return (
    <div className="min-h-screen bg-sky-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 px-3 py-2 bg-sky-950 text-white rounded hover:bg-sky-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        {error && <ErrorMessage message={error} />}

        {currentUser && (
          <>
            <UserCard user={currentUser} />
            <div className="bg-sky-900 rounded p-6 shadow">
              <h2 className="text-xl font-bold text-white mb-4">
                Repositórios ({currentUser.public_repos})
              </h2>
              {repositories.length > 0 ? (
                <RepositoryList repositories={repositories} onSort={sortRepositories} />
              ) : (
                <p className="text-gray-400 text-center py-8">Nenhum repositório encontrado</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
