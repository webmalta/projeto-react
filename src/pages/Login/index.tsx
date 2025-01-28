import { BrowserRouter as Navigate, useNavigate } from "react-router-dom";
import './login.scss';
import { useEffect, useState } from "react";
import Button from "components/Button";
import { mockAuth } from "utils/mockAuth"
  

const Login: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (mockAuth.login(username, password)) {
            navigate("/Home");
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };


    return (
        <div className="login">
            <form role="form" className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    className="input-form" 
                    placeholder="Usuário"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    id="password" 
                    name="password"
                    className="input-form" 
                    placeholder="Senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
                    />
                </div>
                <Button theme="btn-max" type="submit">Login</Button>
                {error && <div className="error">Usuário e senha inválidos!</div>}
            </form>
            
        </div>
    );
};

export default Login;