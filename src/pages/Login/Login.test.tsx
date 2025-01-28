import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';
import { mockAuth } from 'utils/mockAuth';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('utils/mockAuth', () => ({
  mockAuth: {
    login: jest.fn(),
  },
}));

describe('Login Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('deve renderizar os campos de entrada e o botão de login', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByPlaceholderText('Usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('deve atualizar os valores de entrada ao digitar', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');

    fireEvent.change(usernameInput, { target: { value: 'meuUsuario' } });
    fireEvent.change(passwordInput, { target: { value: 'minhaSenha' } });

    expect(usernameInput).toHaveValue('meuUsuario');
    expect(passwordInput).toHaveValue('minhaSenha');
  });

  test('deve navegar para /Home quando o login for bem-sucedido', () => {
    (mockAuth.login as jest.Mock).mockReturnValue(true);

    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const form = screen.getByRole('form');

    fireEvent.change(usernameInput, { target: { value: 'meuUsuario' } });
    fireEvent.change(passwordInput, { target: { value: 'minhaSenha' } });
    fireEvent.submit(form);

    expect(mockAuth.login).toHaveBeenCalledWith('meuUsuario', 'minhaSenha');
    expect(mockNavigate).toHaveBeenCalledWith('/Home');
  });

  test('deve exibir mensagem de erro quando o login falhar e removê-la após 3 segundos', async () => {
    (mockAuth.login as jest.Mock).mockReturnValue(false);
    jest.useFakeTimers();
  
    render(
      <Router>
        <Login />
      </Router>
    );
  
    const usernameInput = screen.getByPlaceholderText('Usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const form = screen.getByRole('form');
  
    fireEvent.change(usernameInput, { target: { value: 'meuUsuario' } });
    fireEvent.change(passwordInput, { target: { value: 'senhaErrada' } });
    fireEvent.submit(form);
  
    expect(await screen.findByText('Usuário e senha inválidos!')).toBeInTheDocument();
  
    jest.advanceTimersByTime(3000);
  
    await waitFor(() => {
      expect(screen.queryByText('Usuário e senha inválidos!')).not.toBeInTheDocument();
    });
  
    jest.useRealTimers();
  });
});