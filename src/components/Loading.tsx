import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Carregando...' }) => {
  return (
    <div className="min-h-screen bg-sky-950 flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin text-sky-400 mb-4" size={48} />
      <p className="text-gray-200 text-lg">{message}</p>
    </div>
  );
};

export default Loading;
