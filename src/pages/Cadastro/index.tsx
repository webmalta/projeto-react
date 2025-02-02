import './cadastro.scss';
import React, { useState } from 'react';
import { Dragon } from "types/dragon";
import { useNavigate } from 'react-router-dom';
import api from "services/api";
import Form from "components/Form";

const Cadastro: React.FC = () => {
    const [formData, setFormData] = useState<Dragon>({
        name: "",
        type: "",
        histories: [],
        createdAt: new Date().toISOString()
    });
    const navigate = useNavigate();

    const salvarDragao = async (dragon: Dragon) => {
        try {
            await api.post<Dragon>("/", dragon);
            alert("Dragão criado com sucesso.");
            navigate('/Home');
        } catch (error) {
            console.error("Erro ao criar o dragão:", error);
        }
    };

    const handleChange = (field: string, value: string) => {
        if (field === "histories") {
            setFormData(prevState => ({
                ...prevState,
                histories: value ? [value] : [],
            }));
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const formatedHistories = formData.histories.join("\n").split("\n");
            const dragonToSave: Dragon = {
                ...formData,
                histories: formatedHistories,
                createdAt: new Date().toISOString(),
            };
            await salvarDragao(dragonToSave);
            setFormData({
                name: '',
                type: '',
                histories: [],
                createdAt: new Date().toISOString()
            });
        } catch {
            console.error("Erro ao salvar o dragão.");
        }
    };


    return (
        <div className="container">
                <Form
                    title="Cadastrar"
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/Home")}
                    submitText="Cadastrar"
                    cancelText="Cancelar"
                />
        </div>
    );
};

export default Cadastro;