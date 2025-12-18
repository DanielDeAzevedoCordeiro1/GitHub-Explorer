import React from 'react';
import { Users, UserPlus, Mail, MapPin, Building, Calendar } from 'lucide-react';
import { GitHubUser } from '../types';
import { formatDate } from '../utils/formatters';

interface UserCardProps {
  user: GitHubUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-sky-900 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={user.avatar_url}
          alt={`Avatar de ${user.name || user.login}`}
          className="w-32 h-32 rounded-full border-4 border-sky-400 flex-shrink-0 mx-auto md:mx-0"
        />

        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">
              {user.name || user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              @{user.login}
            </a>
          </div>

          {user.bio && (
            <p className="text-gray-100 mb-4 italic">"{user.bio}"</p>
          )}

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-200">
              <Users size={18} />
              <span className="font-semibold">{user.followers}</span>
              <span className="text-sm">seguidores</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <UserPlus size={18} />
              <span className="font-semibold">{user.following}</span>
              <span className="text-sm">seguindo</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-200">
            {user.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${user.email}`} className="hover:text-sky-400">
                  {user.email}
                </a>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-2">
                <Building size={16} />
                <span>{user.company}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Membro desde {formatDate(user.created_at, 'long')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
