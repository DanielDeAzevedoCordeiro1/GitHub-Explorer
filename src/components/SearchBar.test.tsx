import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('deve renderizar o campo de busca', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} loading={false} />);
    
    const input = screen.getByPlaceholderText(/Digite o nome do usuário/i);
    expect(input).toBeInTheDocument();
  });

  it('deve renderizar o botão de buscar', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} loading={false} />);
    
    const button = screen.getByRole('button', { name: /Buscar/i });
    expect(button).toBeInTheDocument();
  });
});
