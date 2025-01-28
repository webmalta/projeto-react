import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

const mockOnClick = jest.fn();

describe('Componente Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente com texto filho', () => {
    render(<Button>{'Click'}</Button>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('deve chamar onClick quando o botão for clicado', () => {
    render(<Button onClick={mockOnClick}>{'Click'}</Button>);
    
    fireEvent.click(screen.getByText('Click'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar onClick quando o botão estiver desabilitado', () => {
    render(<Button onClick={mockOnClick} disabled>{'Click'}</Button>);

    fireEvent.click(screen.getByText('Click'));

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('deve ter a classe correta para o tema', () => {
    render(<Button theme="btn-register">{'Click'}</Button>);
    expect(screen.getByText('Click')).toHaveClass('btn-register');
  });

  it('deve ter o tipo correto de botão', () => {
    const { rerender } = render(<Button type="submit">{'Submit'}</Button>);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">{'Reset'}</Button>);
    expect(screen.getByText('Reset')).toHaveAttribute('type', 'reset');
  });

  it('deve ser desabilitado se o estado "disabled" for verdadeiro', () => {
    render(<Button disabled>{'Click'}</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });
});