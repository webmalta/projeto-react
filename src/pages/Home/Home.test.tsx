import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home';
import api from 'services/api';
import { Dragon } from 'types/dragon';

jest.mock('services/api', () => ({
  get: jest.fn(),
}));

describe('Home Component', () => {
  const mockDragons: Dragon[] = [
    { id: 1, name: 'Fúria da Noite', createdAt: '2025-01-01', type: "Night Fury" },
    { id: 2, name: 'Tempestade', createdAt: '2024-12-31', type: "Storm" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve carregar e exibir a lista de dragões', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragons });
  
    render(
      <Router>
        <Home />
      </Router>
    );
  
    expect(screen.getByText('Carregando lista de Dragões...')).toBeInTheDocument();
  
    await waitFor(() => {
      expect(screen.queryByText('Carregando lista de Dragões...')).not.toBeInTheDocument();
    });
  
    mockDragons.forEach((dragon) => {
      expect(screen.getByText(dragon.name)).toBeInTheDocument();
    });
  
    mockDragons.forEach((dragon) => {
      expect(screen.getAllByText('Detalhes')).toHaveLength(mockDragons.length);
    });
  });

  test('deve exibir mensagem de erro caso a requisição falhe', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Erro ao carregar dragões'));

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Carregando lista de Dragões...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Carregando lista de Dragões...')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('Fúria da Noite')).not.toBeInTheDocument();
    expect(screen.queryByText('Tempestade')).not.toBeInTheDocument();
  });
});