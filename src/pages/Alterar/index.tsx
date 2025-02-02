import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "services/api";
import Form from "components/Form";
import { Dragon } from "types/dragon";

const Alterar: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Pick<Dragon, 'name' | 'type' | 'histories'>>({
        name: "",
        type: "",
        histories: [],
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = 'Alterar dados do Dragão';

        const carregarDragao = async () => {
            try {
                const response = await api.get<Dragon>(`/${id}`);
                const textHistories = response.data.histories.join(",").replace(/,/g, "\n");
                setFormData({
                    ...response.data,
                    histories: [textHistories]
                });
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
        const { ...dados } = formData;
        try {
            const formatHistories = formData.histories.join("\n").split("\n");
            await api.put<Dragon>(`/${id}`, { ...dados, histories: formatHistories });
            alert("Alterações salvas com sucesso!");
            navigate('/Home');
        } catch (error) {
            console.error("Erro ao salvar as alterações:", error);
        }
    };

    const handleChange = (field: string, value: string) => {
        if (field === "histories") {
            setFormData(prevState => ({
                ...prevState,
                histories: value ? [value] : []
            }));
        } else {
            setFormData({ ...formData, [field]: value });
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
        <div className="container">
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
    );
};

export default Alterar;