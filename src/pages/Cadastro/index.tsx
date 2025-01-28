import './cadastro.scss';
import React, { useState } from 'react';
import Button from "components/Button";
import { Dragon } from "types/dragon";
import { useNavigate } from 'react-router-dom';
import api from "services/api";

const Cadastro: React.FC = () => {
    const [formData, setFormData] = useState<Dragon>({
        name: "",
        type: "",
        createdAt: new Date().toISOString()
    });
    const navigate = useNavigate();

    const salvarDragao = async (dragon: Dragon) => {
        try {
            await api.post<Dragon>("/", dragon);
            alert("Dragão criado com sucesso.");
        } catch (error) {
            console.error("Erro ao criar o dragão:", error);
            throw error;
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await salvarDragao(formData);
            setFormData({
                name: '',
                type: '',
                createdAt: new Date().toISOString()
            });
        } catch {
            console.error("Erro ao salvar o dragão.");
        }
    };

    return (
            <div className="container-form">
                <h1>Cadastrar Dragões</h1>
                <form role="form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="type">Tipo:</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="group-buttons">
                        <Button theme="btn-max" type="submit">Cadastrar</Button>
                        <Button theme="btn-max" onClick={(() => navigate("/Home"))}>Cancelar</Button>
                    </div>
                </form>
            </div>
    );
};

export default Cadastro;