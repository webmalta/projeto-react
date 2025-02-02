import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Detalhes from '../Detalhes';
import api from 'services/api';
import { Dragon } from 'types/dragon';

jest.mock('services/api', () => ({
  get: jest.fn(),
}));

describe('Detalhes Component', () => {
  const mockDragon: Dragon = {
    id: 1,
    name: 'Fúria da Noite',
    createdAt: '2025-01-28T15:04:24.209Z',
    type: "Night Fury",
    histories: ['historia 1', 'historia 2']
  };

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  test('deve carregar e exibir os detalhes do dragão', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragon });

    render(
      <Router>
        <Detalhes />
      </Router>
    );

    expect(screen.getByText('Carregando Dragão...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockDragon.name)).toBeInTheDocument();
      expect(screen.getByText('Data de criação: 28/01/2025')).toBeInTheDocument();
      expect(screen.getByText(`Tipo: ${mockDragon.type}`)).toBeInTheDocument();
    });

    expect(screen.getByAltText('Avatar do dragão')).toBeInTheDocument();
  });

  test('deve exibir mensagem de erro ao falhar no carregamento', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Erro ao carregar o dragão'));
  
    render(
      <Router>
        <Detalhes />
      </Router>
    );
  
    expect(screen.getByText('Carregando Dragão...')).toBeInTheDocument();
  
    await waitFor(() => {
      expect(screen.queryByText('Carregando Dragão...')).not.toBeInTheDocument();
    });
  
    expect(console.error).toHaveBeenCalledTimes(1);
  
    expect(console.error).toHaveBeenCalledWith(
      'Erro ao carregar o dragão',
      expect.any(Error)
    );
  });
});