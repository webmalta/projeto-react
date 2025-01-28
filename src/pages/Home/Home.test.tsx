import { render, screen, waitFor, fireEvent  } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home';
import api from 'services/api';
import { Dragon } from 'types/dragon';

jest.mock('services/api', () => ({
  get: jest.fn(),
  delete: jest.fn(),
}));

describe('Home Component', () => {
  const mockDragons: Dragon[] = [
    { id: 1, name: 'Fúria da Noite', createdAt: '2025-01-01', type: 'Night Fury' },
    { id: 2, name: 'Banguela', createdAt: '2025-01-02', type: 'Night Fury' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve carregar e exibir a listagem dos dragões corretamente', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragons });

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Carregando lista de Dragões...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockDragons[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockDragons[1].name)).toBeInTheDocument();
    });
  
  });

  test('deve exibir "Listagem vazia" quando não houver dragões', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText('Carregando lista de Dragões...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Listagem vazia.')).toBeInTheDocument();
    });
  });

  test('deve remover um dragão da lista e exibir a atualização na tela', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragons });
    (api.delete as jest.Mock).mockResolvedValueOnce({});

    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(mockDragons[0].name)).toBeInTheDocument();
    });

    const removeButton = screen.getAllByText('Remover')[0];
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByText(mockDragons[0].name)).not.toBeInTheDocument();
    });

    expect(api.delete).toHaveBeenCalledWith('/1');
    expect(screen.getByText(mockDragons[1].name)).toBeInTheDocument();
  });

  test('não deve remover um dragão se o id não for válido', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDragons });
    (api.delete as jest.Mock).mockResolvedValueOnce({});

    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(mockDragons[0].name)).toBeInTheDocument();
    });

    const removeButton = screen.getAllByText('Remover')[0];
    fireEvent.click(removeButton);

    expect(screen.getByText(mockDragons[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockDragons[1].name)).toBeInTheDocument();
  });
});