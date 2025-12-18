import { describe, it, expect } from 'vitest';
import { formatDate, getLanguageColor } from './formatters';

describe('formatDate', () => {
  it('deve formatar data no formato curto (padrão)', () => {
    const data = '2023-12-25T12:00:00Z';
    const resultado = formatDate(data);
    
    expect(resultado).toBe('25/12/2023');
  });

  it('deve formatar data no formato longo', () => {
    const data = '2023-12-25T00:00:00Z';
    const resultado = formatDate(data, 'long');
    
    expect(resultado).toContain('dezembro');
    expect(resultado).toContain('2023');
  });
});

describe('getLanguageColor', () => {
  it('deve retornar a cor correta para JavaScript', () => {
    expect(getLanguageColor('JavaScript')).toBe('bg-yellow-400');
  });

  it('deve retornar a cor correta para TypeScript', () => {
    expect(getLanguageColor('TypeScript')).toBe('bg-blue-600');
  });

  it('deve retornar a cor correta para Python', () => {
    expect(getLanguageColor('Python')).toBe('bg-blue-500');
  });

  it('deve retornar cor padrão para linguagem desconhecida', () => {
    expect(getLanguageColor('LinguagemDesconhecida')).toBe('bg-gray-400');
  });

  it('deve retornar cor padrão quando linguagem é null', () => {
    expect(getLanguageColor(null)).toBe('bg-gray-400');
  });
});
