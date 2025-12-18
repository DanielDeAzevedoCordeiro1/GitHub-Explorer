import React from 'react';
import { Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { searchUser, loading, error, clearError } = useUser();

  const handleSearch = async (username: string): Promise<void> => {
    const success = await searchUser(username);
    if (success) {
      navigate(`/user/${username}`);
    }
  };

  return (
    <div className="min-h-screen bg-sky-950 ">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Github color="#2F81F7" size={90} className="bg-sky-950" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GitHub Explorer
          </h1>
          <p className="text-gray-100 text-lg max-w-2xl mx-auto">
            Busque usuários do GitHub e explore seus repositórios públicos de forma simples e rápida
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} onClearError={clearError} />
        </div>

        {loading && <Loading message="Buscando usuário..." />}

        {error && (
          <div className="max-w-2xl mx-auto">
            <ErrorMessage message={error} />
          </div>
        )}

        {!loading && !error && (
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-sky-950 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Como usar
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-sky-950 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-gray-400 font-bold text-xl">1</span>
                  </div>
                  <p className="text-gray-400 text-lg font-bold">
                    Digite o nome de usuário do GitHub no campo de busca
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-sky-950 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-gray-400 font-bold text-xl">2</span>
                  </div>
                  <p className="text-gray-400 text-lg font-bold">
                    Visualize o perfil completo e os repositórios públicos
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-sky-950 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-gray-400 font-bold text-lg">3</span>
                  </div>
                  <p className="text-gray-400 text-lg font-bold">
                    Clique em um repositório para ver mais informações
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-200 mb-3">Experimente buscar por:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['torvalds'].map((username) => (
                  <button
                    key={username}
                    onClick={() => handleSearch(username)}
                    disabled={loading}
                    className="px-4 py-2 bg-gray-600 text-lg font-medium rounded-xl hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    {username}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
