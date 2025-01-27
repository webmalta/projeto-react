import './button.scss';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    theme?: 'btn-min' | 'btn-max';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type="button", theme="btn-max", disabled = false }) => {
    return (
        <button type={type} className={`button ${theme}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;