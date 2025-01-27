import './login.scss';
import Button from 'components/Button';

const Login: React.FC = () => {
    return (
        <div className="login">
            <form className="login-form">
                <div className="form-group">
                    <input type="text" id="username" name="username" className="input-form" placeholder="Usuário" />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" className="input-form" placeholder="Senha" />
                </div>
                <Button onClick={() => console.log('Button clicked!')}>Login</Button>
            </form>
        </div>
    );
};

export default Login;