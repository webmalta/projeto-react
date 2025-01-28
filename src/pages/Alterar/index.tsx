import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "services/api";
import Form from "components/Form";
import { Dragon } from "types/dragon";

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
        document.title = 'Alterar dados do Dragão';

        const carregarDragao = async () => {
            try {
                const response = await api.get<Dragon>(`/${id}`);
                setFormData(response.data);
                setLoading(true);
              } catch (error) {
                console.error("Erro ao carregar o dragão:", error);
              } finally {
                setLoading(false);
              }
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

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        salvarAlteracoes();
    };

    if (loading) {
        return <div>Carregando dados do dragão...</div>;
    }

    return (
        <div className="container">
            <div className="container-form">
                <Form
                    title="Alterar"
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/Home")}
                    submitText="Alterar"
                    cancelText="Cancelar"
                />
            </div>
        </div>
    );
};

export default Alterar;