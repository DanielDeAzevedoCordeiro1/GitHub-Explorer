import axios, { AxiosError } from 'axios';
import { GitHubUser, GitHubRepository, ApiError } from '../types';

const BASE_URL = 'https://api.github.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: 'Ocorreu um erro ao buscar os dados',
      status: error.response?.status,
    };

    if (error.response?.status === 404) {
      apiError.message = 'Usuário não encontrado';
    } else if (error.response?.status === 403) {
      apiError.message = 'Limite de requisições excedido. Tente novamente em alguns minutos';
    } else if (error.code === 'ERR_NETWORK') {
      apiError.message = 'Erro de conexão. Verifique sua internet';
    }

    return Promise.reject(apiError);
  }
);

export const githubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await api.get<GitHubUser>(`/users/${username}`);
    return response.data;
  },

  async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    const response = await api.get<GitHubRepository[]>(
      `/users/${username}/repos`,
      {
        params: {
          per_page: 100,
          sort: 'updated',
        },
      }
    );
    return response.data;
  },

  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    const response = await api.get<GitHubRepository>(`/repos/${owner}/${repo}`);
    return response.data;
  },
};

export default githubService;
