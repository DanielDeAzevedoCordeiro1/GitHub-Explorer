export const formatDate = (dateString: string, format: 'short' | 'long' = 'short'): string => {
  const date = new Date(dateString);
  if (format === 'long') {
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
  }
  return date.toLocaleDateString('pt-BR');
};

export const getLanguageColor = (language: string | null): string => {
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-600',
    Python: 'bg-blue-500',
    Java: 'bg-red-500',
    'C++': 'bg-pink-500',
    C: 'bg-gray-600',
    'C#': 'bg-purple-600',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-600',
    Ruby: 'bg-red-600',
    PHP: 'bg-indigo-500',
    Swift: 'bg-orange-500',
    Kotlin: 'bg-purple-500',
    Dart: 'bg-blue-400',
  };
  return colors[language || ''] || 'bg-gray-400';
};
