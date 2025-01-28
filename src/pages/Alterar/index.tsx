import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "services/api";
import Button from "components/Button";
import { Dragon } from "types/dragon";
import { Link } from 'react-router-dom';

const Alterar: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Dragon>({
        name: "",
        type: "",
        createdAt: new Date().toISOString()
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const carregarDragao = async () => {
            await api.get<Dragon>(`/${id}`).then((response) => {
                setFormData(response.data);
            }).catch((error) => {
              console.error("Erro ao carregar o dragão:", error);
            }).finally(() => {
              setLoading(false);
            });
          };
        carregarDragao();
    }, [id]);

    const salvarAlteracoes = async () => {
        const { createdAt, ...dados } = formData;
        try {
            await api.put<Dragon>(`/${id}`, dados);
            alert("Alterações salvas com sucesso!");
            navigate('/Home');
        } catch (error) {
            console.error("Erro ao salvar as alterações:", error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        salvarAlteracoes();
    };

    if (loading) {
        return <div>Carregando dados do dragão...</div>;
    }

    return (
        <div className="container-alterar">
            <h1>Alterar Dragão</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome do Dragão:
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                </label>
                <label>
                    Tipo do Dragão:
                    <input
                        type="text"
                        value={formData.type}
                        onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                        }
                    />
                </label>
                <div className="group-buttons">
                    <Button theme="btn-max" type="submit">Alterar</Button>
                    <Button theme="btn-max" onClick={(() => navigate("/Home"))}>Cancelar</Button>
                </div>
            </form>
        </div>
    );
};

export default Alterar;