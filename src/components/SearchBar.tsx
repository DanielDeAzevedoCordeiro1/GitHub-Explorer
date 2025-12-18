import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
  onClearError?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading, onClearError }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    if (onClearError) {
      onClearError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Digite o nome do usuário do GitHub..."
          disabled={loading}
          className="w-full px-4 py-3 pl-12 pr-4 text-white bg-sky-950 border rounded-lg placeholder-gray-300"
          aria-label="Campo de busca de usuário"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-400"
          size={20}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
