import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
  it('deve renderizar a mensagem de erro corretamente', () => {
    const mensagem = 'Usuário não encontrado';
    render(<ErrorMessage message={mensagem} />);
    
    expect(screen.getByText(mensagem)).toBeInTheDocument();
  });

  it('deve renderizar o título "Erro"', () => {
    render(<ErrorMessage message="Algum erro" />);
    
    expect(screen.getByText('Erro')).toBeInTheDocument();
  });

  it('deve renderizar o ícone de alerta', () => {
    const { container } = render(<ErrorMessage message="Teste" />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
