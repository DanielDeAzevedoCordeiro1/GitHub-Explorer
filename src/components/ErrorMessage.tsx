import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-sky-900 border-2 border-red-500 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-white mb-1">Erro</h3>
        <p className="text-gray-200 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
